"use client"

import { useEffect, useState } from "react"

export function RotatingText({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  // Clone the first word at the end so the upward roll can loop seamlessly.
  const items = [...words, words[0] ?? ""]
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => setIndex((i) => i + 1), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  // When we land on the cloned word (last slot), snap back to the real first word
  // without animation once the slide finishes, then re-enable animation next frame.
  useEffect(() => {
    if (index !== items.length - 1) return
    const t = setTimeout(() => {
      setAnimate(false)
      setIndex(0)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    }, 520)
    return () => clearTimeout(t)
  }, [index, items.length])

  if (words.length <= 1) {
    return <span>{words[0] ?? ""}</span>
  }

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "")

  return (
    <span className="relative inline-block overflow-hidden whitespace-nowrap align-bottom" style={{ height: "1.15em" }}>
      {/* Width reservation */}
      <span className="invisible block" aria-hidden="true">
        {longest}
      </span>
      <span
        className="absolute inset-0 flex flex-col"
        style={{
          transform: `translateY(-${index * 1.15}em)`,
          transition: animate ? "transform 0.5s cubic-bezier(0.6, 0, 0.3, 1)" : "none",
        }}
      >
        {items.map((w, i) => (
          <span key={`${w}-${i}`} className="block" style={{ height: "1.15em", lineHeight: "1.15em" }}>
            {w}
          </span>
        ))}
      </span>
    </span>
  )
}
