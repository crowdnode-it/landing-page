"use client"

import { useEffect } from "react"

export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100)
  }, [])

  return null
}
