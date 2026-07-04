import { type NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"
import { META_PIXEL_ID } from "@/lib/meta-pixel"

const GRAPH_API_VERSION = "v21.0"

// Este endpoint recebe os webhooks do GGcheckout.
// Fluxo: cliente paga -> GGcheckout faz POST aqui -> nós enviamos o evento
// Purchase para a Meta (Conversions API) usando os dados reais da venda.
//
// URL para configurar no GGcheckout:
//   https://SEU-DOMINIO/api/public/gg-webhook
//
// Marque no GGcheckout os eventos de pagamento APROVADO (ex.: "Pix pago",
// "Pagamento com cartão"). Eventos de falha/expiração são ignorados aqui.

// ---------- helpers ----------

// A Meta exige e-mail/telefone com hash SHA-256 (dados normalizados).
function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex")
}

function hashEmail(email?: unknown): string | undefined {
  if (typeof email !== "string") return undefined
  const normalized = email.trim().toLowerCase()
  if (!normalized || !normalized.includes("@")) return undefined
  return sha256(normalized)
}

function hashPhone(phone?: unknown): string | undefined {
  if (typeof phone !== "string") return undefined
  // Mantém só dígitos. A Meta recomenda incluir o código do país.
  const digits = phone.replace(/\D/g, "")
  if (digits.length < 8) return undefined
  return sha256(digits)
}

function hashName(name?: unknown): string | undefined {
  if (typeof name !== "string") return undefined
  const normalized = name.trim().toLowerCase()
  if (!normalized) return undefined
  return sha256(normalized)
}

// Busca um valor em várias chaves possíveis (o payload do GGcheckout pode variar).
function pick(obj: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    const value = obj[key]
    if (value !== undefined && value !== null && value !== "") return value
  }
  return undefined
}

// Converte valores como "39.90", "3990", 39.9 em número (reais).
function toAmount(value: unknown): number | undefined {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".")
    const parsed = Number.parseFloat(cleaned)
    if (!Number.isNaN(parsed)) return parsed
  }
  return undefined
}

// Considera "pago/aprovado" a partir de vários formatos de status.
function isPaid(payload: Record<string, unknown>, rawText: string): boolean {
  const status = String(
    pick(payload, ["status", "payment_status", "paymentStatus", "event", "type", "event_type"]) ?? "",
  ).toLowerCase()

  // "pagamento com cart" cobre o evento "Pagamento com cartão" do GGcheckout
  // (cartão aprovado), que não contém as palavras "pago"/"aprovado".
  const paidWords = [
    "paid",
    "pago",
    "approved",
    "aprovad",
    "completed",
    "success",
    "pix_paid",
    "confirmed",
    "pagamento com cart",
  ]
  const failWords = ["fail", "falh", "expired", "expirad", "refund", "reembols", "pending", "pendente", "canceled", "cancelad", "declined", "recusad", "gerado", "gerada"]

  if (failWords.some((w) => status.includes(w))) return false
  if (paidWords.some((w) => status.includes(w))) return true

  // Fallback: procura pistas no corpo cru (ex.: "pix pago").
  const text = rawText.toLowerCase()
  if (failWords.some((w) => text.includes(w))) return false
  return paidWords.some((w) => text.includes(w))
}

// ---------- handler ----------

export async function POST(req: NextRequest) {
  const raw = await req.text()

  // 1) Validação opcional do segredo assinado (campo "Segredo" no GGcheckout).
  const secret = process.env.GG_WEBHOOK_SECRET
  if (secret) {
    const signature =
      req.headers.get("x-signature") ||
      req.headers.get("x-webhook-signature") ||
      req.headers.get("x-gg-signature") ||
      req.headers.get("signature") ||
      ""

    const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex")
    // Aceita tanto assinatura HMAC quanto o segredo enviado direto (fallback).
    const matchesHmac = signature.replace(/^sha256=/, "") === expected
    const matchesPlain = signature === secret
    if (!matchesHmac && !matchesPlain) {
      console.log("[v0][gg-webhook] assinatura inválida. header:", signature)
      return NextResponse.json({ ok: false, reason: "invalid_signature" }, { status: 401 })
    }
  }

  // 2) Parse do corpo.
  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(raw) as Record<string, unknown>
  } catch {
    console.log("[v0][gg-webhook] corpo não-JSON:", raw.slice(0, 500))
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 })
  }

  console.log("[v0][gg-webhook] payload recebido:", JSON.stringify(payload).slice(0, 1000))

  // Alguns webhooks aninham os dados em "data" ou "order".
  const data =
    (payload.data as Record<string, unknown>) ||
    (payload.order as Record<string, unknown>) ||
    (payload.transaction as Record<string, unknown>) ||
    payload

  // 3) Só seguimos para pagamentos aprovados.
  if (!isPaid(payload, raw) && !isPaid(data, raw)) {
    console.log("[v0][gg-webhook] evento ignorado (não é pagamento aprovado).")
    return NextResponse.json({ ok: true, ignored: true, reason: "not_paid" })
  }

  // 4) Sem token não conseguimos enviar à Meta.
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!accessToken) {
    console.log("[v0][gg-webhook] META_CAPI_ACCESS_TOKEN ausente.")
    return NextResponse.json({ ok: false, reason: "missing_token" }, { status: 200 })
  }

  // 5) Extrai dados da venda.
  const email = pick(data, ["email", "customer_email", "buyer_email", "client_email"]) ??
    pick((data.customer as Record<string, unknown>) ?? {}, ["email"])
  const phone = pick(data, ["phone", "telefone", "customer_phone", "buyer_phone", "whatsapp", "cellphone"]) ??
    pick((data.customer as Record<string, unknown>) ?? {}, ["phone", "telefone"])
  const name = pick(data, ["name", "customer_name", "buyer_name", "client_name", "full_name"]) ??
    pick((data.customer as Record<string, unknown>) ?? {}, ["name"])
  const value = toAmount(
    pick(data, ["value", "amount", "total", "price", "valor", "total_price", "net_amount"]),
  )
  const currency = String(pick(data, ["currency", "moeda"]) ?? "BRL").toUpperCase()
  const orderId = pick(data, ["id", "order_id", "transaction_id", "code", "reference"])

  // Identificadores de anúncio, caso o GGcheckout repasse os cookies do Pixel.
  const fbp = pick(data, ["fbp", "_fbp"])
  const fbc = pick(data, ["fbc", "_fbc"])

  // 6) Monta user_data com hashes (dados reais -> ótima correspondência).
  const userData: Record<string, unknown> = {}
  const em = hashEmail(email)
  const ph = hashPhone(phone)
  const fn = hashName(name)
  if (em) userData.em = em
  if (ph) userData.ph = ph
  if (fn) userData.fn = fn
  if (typeof fbp === "string") userData.fbp = fbp
  if (typeof fbc === "string") userData.fbc = fbc

  // event_id determinístico (usa o id do pedido) para deduplicar caso o
  // GGcheckout também dispare Purchase pelo Pixel/CAPI nativo dele.
  const eventId = orderId ? `gg_${String(orderId)}` : `gg_${Date.now()}`

  const metaPayload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: userData,
        custom_data: {
          ...(value !== undefined ? { value } : {}),
          currency,
          ...(orderId ? { order_id: String(orderId) } : {}),
        },
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metaPayload),
      },
    )
    const result = await res.json()
    if (!res.ok) {
      console.log("[v0][gg-webhook] erro da Meta:", JSON.stringify(result))
      return NextResponse.json({ ok: false, error: result }, { status: 200 })
    }
    console.log("[v0][gg-webhook] Purchase enviado à Meta. eventId:", eventId)
    return NextResponse.json({ ok: true, eventId, result })
  } catch (error) {
    console.log("[v0][gg-webhook] falha ao chamar a Meta:", String(error))
    return NextResponse.json({ ok: false, error: String(error) }, { status: 200 })
  }
}

// GGcheckout pode fazer um GET para validar a URL do webhook.
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "gg-webhook", ready: true })
}
