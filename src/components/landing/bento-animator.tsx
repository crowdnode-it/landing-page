"use client"

import { useEffect } from "react"

// One pulse of the CSS keyframe animation lasts 2.4s. Hold each card for 3
// pulses, then advance to the next card in reading order.
const PULSE_MS = 2400
const PULSES_PER_CARD = 2
const CYCLE_MS = PULSE_MS * PULSES_PER_CARD

// Visual reading order of the bento grid.
const ORDER = ["tokens", "founders", "sell", "etf", "updates", "grow"]

export function BentoAnimator() {
  useEffect(() => {
    let idx = 0

    function activate(active: number) {
      ORDER.forEach((id, i) => {
        const el = document.querySelector(`[data-value-id="${id}"]`)
        if (!el) return
        // Force the animation to restart from frame 0 on the newly active card
        // by clearing the flag first, then re-setting it on the next frame.
        el.setAttribute("data-animated", i === active ? "true" : "false")
      })
    }

    activate(0)

    const timer = window.setInterval(() => {
      idx = (idx + 1) % ORDER.length
      activate(idx)
    }, CYCLE_MS)

    return () => window.clearInterval(timer)
  }, [])

  return null
}
