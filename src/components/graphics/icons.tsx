export function HeartPulseIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 54 C 14 42, 6 30, 10 20 C 14 10, 26 10, 32 20 C 38 10, 50 10, 54 20 C 58 30, 50 42, 32 54 Z" />
      <path d="M10 32 H 22 L 26 24 L 32 40 L 36 30 L 40 34 H 54" />
    </svg>
  )
}

export function BrainCircuitIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 14 C 20 14, 16 20, 16 26 C 12 28, 12 36, 16 38 C 16 46, 22 50, 28 50 V 14 Z" />
      <path d="M36 14 C 44 14, 48 20, 48 26 C 52 28, 52 36, 48 38 C 48 46, 42 50, 36 50 V 14 Z" />
      <circle cx="22" cy="24" r="1.6" fill="currentColor" />
      <circle cx="22" cy="38" r="1.6" fill="currentColor" />
      <circle cx="42" cy="24" r="1.6" fill="currentColor" />
      <circle cx="42" cy="38" r="1.6" fill="currentColor" />
      <path d="M22 24 H 14 M22 38 H 14 M42 24 H 50 M42 38 H 50" />
      <path d="M50 24 L 56 22 M50 38 L 56 40 M14 24 L 8 22 M14 38 L 8 40" />
      <circle cx="56" cy="22" r="1.4" />
      <circle cx="56" cy="40" r="1.4" />
      <circle cx="8" cy="22" r="1.4" />
      <circle cx="8" cy="40" r="1.4" />
    </svg>
  )
}

export function LeafIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 12 C 24 12, 14 26, 14 42 C 14 50, 18 54, 22 54 C 38 54, 52 42, 52 18 C 52 14, 50 12, 48 12 Z" />
      <path d="M20 52 L 44 22" />
    </svg>
  )
}

export function BankIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 24 L 32 12 L 54 24 Z" />
      <path d="M10 26 H 54" />
      <path d="M16 28 V 48 M26 28 V 48 M38 28 V 48 M48 28 V 48" />
      <path d="M8 50 H 56" />
      <path d="M8 54 H 56" />
    </svg>
  )
}

export function CarIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 42 V 32 C 8 30, 9 28, 12 27 L 18 18 C 19 16, 21 16, 22 16 H 42 C 44 16, 45 16, 46 18 L 52 27 C 55 28, 56 30, 56 32 V 42 H 48" />
      <path d="M16 42 H 8" />
      <path d="M48 42 H 56" />
      <path d="M12 28 H 52" />
      <circle cx="20" cy="44" r="5" />
      <circle cx="44" cy="44" r="5" />
    </svg>
  )
}

export function BoltIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 6 L 14 36 H 30 L 26 58 L 50 28 H 34 Z" />
    </svg>
  )
}

export function PieIcon({ size = 64, stroke = 1.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 14 V 32 L 48 40 A 18 18 0 1 1 32 14 Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M34 12 A 18 18 0 0 1 52 30 H 34 Z" />
    </svg>
  )
}

export function DocIcon({ size = 42, stroke = 1.4, filled = false, color }: { size?: number; stroke?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size * 1.18} viewBox="0 0 40 48" fill="none" stroke={color || "currentColor"} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4 H 26 L 34 12 V 44 H 6 Z" fill={filled ? (color || "currentColor") : "none"} fillOpacity={filled ? 0.18 : 0} />
      <path d="M26 4 V 12 H 34" />
      <path d="M12 20 H 28 M12 26 H 28 M12 32 H 22" />
    </svg>
  )
}

export function SparkleIcon({ size = 56, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill={color || "currentColor"}>
      <path d="M28 4 L 31 22 L 49 25 L 31 28 L 28 46 L 25 28 L 7 25 L 25 22 Z" />
      <path d="M44 8 L 45.5 14 L 51 15.5 L 45.5 17 L 44 23 L 42.5 17 L 37 15.5 L 42.5 14 Z" opacity="0.85" />
      <path d="M10 36 L 11 40 L 15 41 L 11 42 L 10 46 L 9 42 L 5 41 L 9 40 Z" opacity="0.7" />
    </svg>
  )
}

export function FlowerIcon({ size = 28, color }: { size?: number; color?: string }) {
  const petals = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2
    const cx = 16 + Math.cos(a) * 8
    const cy = 16 + Math.sin(a) * 8
    return <ellipse key={i} cx={cx} cy={cy} rx="2.6" ry="4.2" transform={`rotate(${(a * 180) / Math.PI + 90} ${cx} ${cy})`} />
  })
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color || "currentColor"}>
      <circle cx="16" cy="16" r="2.4" />
      {petals}
    </svg>
  )
}

export function ArrowNavIcon({ size = 28, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color || "currentColor"} stroke={color || "currentColor"} strokeWidth="1.2" strokeLinejoin="round">
      <path d="M16 4 L 26 26 L 16 22 L 6 26 Z" />
    </svg>
  )
}

export function FinovaIcon({ size = 28, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color || "currentColor"} strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 11 H 26 M6 16 H 26 M6 21 H 22" />
    </svg>
  )
}

export function QuantumIcon({ size = 28, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color || "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="9" />
      <path d="M16 8 V 18 L 19 21" />
    </svg>
  )
}

export function CornerBracket({ x, y, w = 28, dir = "tl", color }: { x: number; y: number; w?: number; dir?: "tl" | "tr" | "bl" | "br"; color: string }) {
  const paths: Record<string, string> = {
    tl: `M${x} ${y + w} V${y} H${x + w}`,
    tr: `M${x - w} ${y} H${x} V${y + w}`,
    bl: `M${x} ${y - w} V${y} H${x + w}`,
    br: `M${x - w} ${y} H${x} V${y - w}`,
  }
  return <path d={paths[dir]} stroke={color} strokeWidth="2" fill="none" />
}
