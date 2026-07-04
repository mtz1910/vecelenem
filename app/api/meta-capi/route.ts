import { type NextRequest, NextResponse } from "next/server"
import { META_PIXEL_ID } from "@/lib/meta-pixel"

const GRAPH_API_VERSION = "v21.0"

export async function POST(req: NextRequest) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!accessToken) {
    // Sem token não dá pra enviar ao servidor; o Pixel do navegador ainda cobre o evento.
    return NextResponse.json({ ok: false, reason: "missing_token" }, { status: 200 })
  }

  let body: {
    eventName?: string
    eventId?: string
    eventSourceUrl?: string
    fbp?: string
    fbc?: string
    customData?: Record<string, unknown>
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 })
  }

  const { eventName, eventId, eventSourceUrl, fbp, fbc, customData } = body
  if (!eventName || !eventId) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 })
  }

  // IP e User-Agent reais do cliente para melhorar a correspondência de eventos.
  const forwardedFor = req.headers.get("x-forwarded-for")
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || undefined
  const userAgent = req.headers.get("user-agent") || undefined

  // Só enviamos identificadores reais (fbp/fbc/ip/ua). Nunca enviamos e-mails/telefones
  // duplicados ou placeholders, o que degradaria a qualidade da correspondência.
  const userData: Record<string, unknown> = {}
  if (fbp) userData.fbp = fbp
  if (fbc) userData.fbc = fbc
  if (clientIp) userData.client_ip_address = clientIp
  if (userAgent) userData.client_user_agent = userAgent

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // MESMO id do Pixel -> deduplicação
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        ...(customData && Object.keys(customData).length > 0 ? { custom_data: customData } : {}),
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    )
    const result = await res.json()
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: result }, { status: 200 })
    }
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 200 })
  }
}
