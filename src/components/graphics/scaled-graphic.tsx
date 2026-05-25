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

    function update() {
      const w = el!.clientWidth
      if (w > 0) setZoom(w / artWidth)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [artWidth])

  return (
    <div ref={ref} className={className} style={{ width: "100%" }}>
      {zoom !== null && (
        <div style={{ width: artWidth, height: artHeight, zoom }}>
          {children}
        </div>
      )}
    </div>
  )
}
