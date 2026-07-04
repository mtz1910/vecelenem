export const META_PIXEL_ID = "1547784333801355"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Gera um ID de evento único para deduplicação entre navegador (Pixel) e servidor (CAPI).
 * A Meta usa esse ID para reconhecer que o evento do browser e o do servidor são o mesmo.
 */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

/**
 * Dispara um evento no Pixel (navegador) e na API de Conversões (servidor)
 * usando o MESMO eventID, garantindo a deduplicação.
 */
export async function trackMetaEvent(
  eventName: string,
  customData: Record<string, unknown> = {},
): Promise<void> {
  const eventId = generateEventId()

  // 1) Navegador (Pixel)
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, customData, { eventID: eventId })
  }

  // 2) Servidor (Conversions API) com o mesmo eventId para deduplicar
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
        customData,
      }),
      keepalive: true,
    })
  } catch {
    // Falha silenciosa: o evento do Pixel já foi enviado.
  }
}
