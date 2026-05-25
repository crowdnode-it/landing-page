import type { GraphicPalette } from "./types"

const ROWS = [
  { seller: "Emma", buyer: "Nina", company: "AeroVision", tokens: "12,500 TOKENS", price: "€30,000", iconType: "flower" as const },
  { seller: "Liam", buyer: "Lucas", company: "Nexera", tokens: "8,000 TOKENS", price: "€24,800", iconType: "arrow" as const },
  { seller: "Sofia", buyer: "Clara", company: "Finova", tokens: "5,000 TOKENS", price: "€9,750", iconType: "finova" as const },
  { seller: "Marco", buyer: "Andre", company: "QuantumLeap", tokens: "15,000 TOKENS", price: "€41,250", iconType: "quantum" as const },
]

function FlowerIconPaths({ color }: { color: string }) {
  const petals = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2
    const cx = 0 + Math.cos(a) * 8
    const cy = 0 + Math.sin(a) * 8
    return <ellipse key={i} cx={cx} cy={cy} rx="2.6" ry="4.2" transform={`rotate(${(a * 180) / Math.PI + 90} ${cx} ${cy})`} fill={color} />
  })
  return (
    <g>
      <circle cx="0" cy="0" r="2.4" fill={color} />
      {petals}
    </g>
  )
}

function ArrowNavIconPaths({ color }: { color: string }) {
  return <path d="M0 -10 L 8 10 L 0 6.5 L -8 10 Z" fill={color} stroke={color} strokeWidth="0.8" strokeLinejoin="round" />
}

function FinovaIconPaths({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <path d="M-8 -4 H 8" />
      <path d="M-8 0.5 H 8" />
      <path d="M-8 5 H 5" />
    </g>
  )
}

function QuantumIconPaths({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="0" r="9" />
      <path d="M0 -6.5 V 2 L 2.5 4.5" />
    </g>
  )
}

function CompanyIcon({ iconType, color }: { iconType: string; color: string }) {
  switch (iconType) {
    case "flower":
      return <FlowerIconPaths color={color} />
    case "arrow":
      return <ArrowNavIconPaths color={color} />
    case "finova":
      return <FinovaIconPaths color={color} />
    case "quantum":
      return <QuantumIconPaths color={color} />
    default:
      return null
  }
}

export function SecondaryMarket({ palette }: { palette: GraphicPalette }) {
  const p = palette
  const bg = p.background
  const panelStroke = p.panelStroke
  const text = p.text
  const muted = p.muted
  const accent = p.accent
  const lineColors = p.lineColors
  const mode = p.mode

  const W = 1448
  const H = 1086
  const sellerX = 120
  const tokenX = 320
  const buyerX = 1328
  const hubLeft = 580
  const hubRight = 900
  const hubTop = 270
  const hubBot = 940
  const hubCenterX = (hubLeft + hubRight) / 2
  const rowYs = [340, 530, 720, 910]
  const hubExitYs = [340, 530, 720, 910]
  const exitRowMap = [0, 2, 1, 3]

  const fontMono = '"JetBrains Mono", monospace'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width={W} height={H} fill={bg} />

      <defs>
        {mode === "dark" &&
          lineColors.map((c, i) => (
            <filter key={`glow-${i}`} id={`sm-glow-${i}-${c.replace("#", "")}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
      </defs>

      {/* Corner brackets */}
      <path d={`M24 ${24 + 28} V24 H${24 + 28}`} stroke={muted} strokeWidth="2" fill="none" />
      <path d={`M${W - 24 - 28} 24 H${W - 24} V${24 + 28}`} stroke={muted} strokeWidth="2" fill="none" />
      <path d={`M24 ${H - 24 - 28} V${H - 24} H${24 + 28}`} stroke={muted} strokeWidth="2" fill="none" />
      <path d={`M${W - 24 - 28} ${H - 24} H${W - 24} V${H - 24 - 28}`} stroke={muted} strokeWidth="2" fill="none" />

      {/* Panel border */}
      <rect
        x={60}
        y={60}
        width={W - 120}
        height={H - 120}
        rx={18}
        ry={18}
        fill="none"
        stroke={panelStroke}
        strokeWidth="1"
      />

      {/* Header left: [ SECONDARY MARKET ] */}
      <text
        x={110}
        y={100}
        fill={text}
        fontSize="17"
        fontFamily={fontMono}
        letterSpacing="0.18em"
      >
        [ SECONDARY MARKET ]
      </text>

      {/* Header right: PEER-TO-PEER LIQUIDITY */}
      <text
        x={W - 110}
        y={100}
        fill={text}
        fontSize="17"
        fontFamily={fontMono}
        letterSpacing="0.18em"
        textAnchor="end"
      >
        PEER-TO-PEER LIQUIDITY
      </text>

      {/* Title: SECONDARY MARKET centered */}
      <text
        x={W / 2}
        y={172}
        fill={accent}
        fontSize="26"
        fontFamily={fontMono}
        letterSpacing="0.32em"
        textAnchor="middle"
      >
        SECONDARY MARKET
      </text>

      {/* Underline below title */}
      <rect
        x={W / 2 - 40}
        y={195}
        width={80}
        height={1}
        fill={accent}
        opacity={0.8}
      />

      {/* Central MARKET hub */}
      <g>
        <rect
          x={hubLeft}
          y={hubTop}
          width={hubRight - hubLeft}
          height={hubBot - hubTop}
          rx={20}
          ry={20}
          fill={mode === "dark" ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.012)"}
          stroke={panelStroke}
          strokeWidth="1.2"
        />

        {/* Corner pins */}
        {(
          [
            [hubLeft, hubTop],
            [hubRight, hubTop],
            [hubLeft, hubBot],
            [hubRight, hubBot],
          ] as [number, number][]
        ).map(([cx, cy], i) => (
          <circle key={`pin-${i}`} cx={cx} cy={cy} r="4.5" fill={bg} stroke={accent} strokeWidth="1.3" />
        ))}

        {/* Dot grid */}
        {Array.from({ length: 22 }).map((_, r) =>
          Array.from({ length: 10 }).map((__, c) => (
            <circle
              key={`dot-${r}-${c}`}
              cx={hubLeft + 22 + c * 30}
              cy={hubTop + 28 + r * 30}
              r="1"
              fill={panelStroke}
              opacity={mode === "dark" ? 0.55 : 0.7}
            />
          ))
        )}

        {/* MARKET label above hub */}
        <text
          x={hubCenterX}
          y={244}
          fill={accent}
          fontSize="22"
          fontFamily={fontMono}
          textAnchor="middle"
          letterSpacing="8"
        >
          MARKET
        </text>
      </g>

      {/* Connection lines for each row */}
      {ROWS.map((_, i) => {
        const y = rowYs[i]
        const lc = lineColors[i]
        const exitY = hubExitYs[exitRowMap[i]]
        const filt = mode === "dark" ? `url(#sm-glow-${i}-${lc.replace("#", "")})` : undefined
        const sellerNodeR = 34
        const tokenR = 42
        const buyerNodeR = 34
        const x_s_r = sellerX + sellerNodeR
        const x_t_l = tokenX - tokenR
        const x_t_r = tokenX + tokenR
        const x_h_l = hubLeft
        const x_h_r = hubRight
        const x_b_l = buyerX - buyerNodeR

        return (
          <g key={`lines-${i}`} filter={filt}>
            {/* Seller to token */}
            <path d={`M ${x_s_r} ${y} L ${x_t_l} ${y}`} stroke={lc} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Token to hub left */}
            <path
              d={`M ${x_t_r} ${y} C ${(x_t_r + x_h_l) / 2} ${y}, ${(x_t_r + x_h_l) / 2} ${y}, ${x_h_l} ${y}`}
              stroke={lc}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Hub left to hub right (X-crossing) */}
            <path d={`M ${x_h_l} ${y} L ${x_h_r} ${exitY}`} stroke={lc} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Hub right to buyer */}
            <path
              d={`M ${x_h_r} ${exitY} C ${(x_h_r + x_b_l) / 2} ${exitY}, ${(x_h_r + x_b_l) / 2} ${exitY}, ${x_b_l} ${exitY}`}
              stroke={lc}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Connection dots */}
            <circle cx={x_h_l} cy={y} r="4" fill={lc} />
            <circle cx={x_h_r} cy={exitY} r="4" fill={lc} />
            <circle cx={x_s_r + 4} cy={y} r="3.5" fill={lc} />
            <circle cx={x_b_l - 4} cy={exitY} r="3.5" fill={lc} />
          </g>
        )
      })}

      {/* Seller and buyer name circles + token nodes */}
      {ROWS.map((row, i) => {
        const y = rowYs[i]
        const lc = lineColors[i]
        const buyerY = hubExitYs[exitRowMap[i]]

        return (
          <g key={`nodes-${i}`}>
            {/* Seller circle */}
            <g transform={`translate(${sellerX}, ${y})`}>
              <circle
                cx={0}
                cy={0}
                r={34}
                fill={bg}
                stroke={lc}
                strokeWidth="1.5"
                {...(mode === "dark" ? { filter: `url(#sm-glow-${i}-${lc.replace("#", "")})` } : {})}
              />
              <text
                x={0}
                y={0}
                fill={text}
                fontSize="14"
                fontFamily={fontMono}
                letterSpacing="0.06em"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {row.seller}
              </text>
            </g>

            {/* Buyer circle */}
            <g transform={`translate(${buyerX}, ${buyerY})`}>
              <circle
                cx={0}
                cy={0}
                r={34}
                fill={bg}
                stroke={lc}
                strokeWidth="1.5"
                {...(mode === "dark" ? { filter: `url(#sm-glow-${i}-${lc.replace("#", "")})` } : {})}
              />
              <text
                x={0}
                y={0}
                fill={text}
                fontSize="14"
                fontFamily={fontMono}
                letterSpacing="0.06em"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {row.buyer}
              </text>
            </g>

            {/* Token node */}
            <g transform={`translate(${tokenX}, ${y})`}>
              {/* Token circle */}
              <circle
                cx={0}
                cy={0}
                r={42}
                fill={bg}
                stroke={lc}
                strokeWidth="1.5"
                {...(mode === "dark" ? { filter: `url(#sm-glow-${i}-${lc.replace("#", "")})` } : {})}
              />
              {/* Company icon */}
              <g transform="translate(0, -8)">
                <CompanyIcon iconType={row.iconType} color={text} />
              </g>
              {/* Company name inside circle */}
              <text
                x={0}
                y={18}
                fill={text}
                fontSize="9.5"
                fontFamily={fontMono}
                letterSpacing="0.04em"
                textAnchor="middle"
              >
                {row.company}
              </text>
              {/* Tokens and price below circle */}
              <text
                x={0}
                y={62}
                fill={lc}
                fontSize="12.5"
                fontFamily={fontMono}
                letterSpacing="0.06em"
                textAnchor="middle"
                fontWeight={500}
              >
                <tspan>{row.tokens}</tspan>
                <tspan fill={muted}> {"•"} </tspan>
                <tspan>{row.price}</tspan>
              </text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}
