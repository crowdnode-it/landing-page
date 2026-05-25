"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

export function ScaledGraphic({
  artWidth,
  artHeight,
  children,
  className,
}: {
  artWidth: number
  artHeight: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function measure() {
      const w = el!.clientWidth
      if (w > 0) {
        setZoom(w / artWidth)
      } else {
        requestAnimationFrame(measure)
      }
    }

    measure()

    const ro = new ResizeObserver(() => {
      const w = el!.clientWidth
      if (w > 0) setZoom(w / artWidth)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [artWidth])

  return (
    <div ref={ref} className={className} style={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          width: artWidth,
          height: artHeight,
          zoom: zoom ?? 0.001,
          opacity: zoom !== null ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
