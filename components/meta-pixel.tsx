"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"
import { META_PIXEL_ID, generateEventId } from "@/lib/meta-pixel"

export function MetaPixel() {
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true

    const eventId = generateEventId()

    // PageView no navegador com eventID para deduplicar com o servidor
    const sendPageView = () => {
      if (typeof window.fbq === "function") {
        window.fbq("track", "PageView", {}, { eventID: eventId })
      }
    }

    // fbq pode ainda não estar pronto quando o efeito roda
    if (typeof window.fbq === "function") {
      sendPageView()
    } else {
      const timer = window.setInterval(() => {
        if (typeof window.fbq === "function") {
          sendPageView()
          window.clearInterval(timer)
        }
      }, 200)
      window.setTimeout(() => window.clearInterval(timer), 4000)
    }

    // PageView no servidor (Conversions API) com o mesmo eventId
    function readCookie(name: string) {
      const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
      return match ? decodeURIComponent(match[1]) : undefined
    }

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "PageView",
        eventId,
        eventSourceUrl: window.location.href,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
      }),
      keepalive: true,
    }).catch(() => {})
  }, [])

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
      `}
    </Script>
  )
}
