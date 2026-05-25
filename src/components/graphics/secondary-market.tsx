import { FlowerIcon, ArrowNavIcon, FinovaIcon, QuantumIcon, CornerBracket } from "./icons"
import type { GraphicPalette } from "./types"

const ROWS = [
  { seller: "Emma", buyer: "Nina", company: "AeroVision", tokens: "12,500 TOKENS", price: "€30,000", Icon: FlowerIcon },
  { seller: "Liam", buyer: "Lucas", company: "Nexera", tokens: "8,000 TOKENS", price: "€24,800", Icon: ArrowNavIcon },
  { seller: "Sofia", buyer: "Clara", company: "Finova", tokens: "5,000 TOKENS", price: "€9,750", Icon: FinovaIcon },
  { seller: "Marco", buyer: "Andre", company: "QuantumLeap", tokens: "15,000 TOKENS", price: "€41,250", Icon: QuantumIcon },
]

function NameCircle({ x, y, label, stroke, text, bg, mode }: { x: number; y: number; label: string; stroke: string; text: string; bg: string; mode: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 34,
        top: y - 34,
        width: 68,
        height: 68,
        borderRadius: "50%",
        border: `1.5px solid ${stroke}`,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: text,
        fontSize: 14,
        letterSpacing: "0.06em",
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        boxShadow: mode === "dark" ? `0 0 14px ${stroke}55` : "none",
      }}
    >
      {label}
    </div>
  )
}

function TokenNode({
  x,
  y,
  row,
  text,
  muted,
  bg,
  stroke,
  mode,
}: {
  x: number
  y: number
  row: (typeof ROWS)[0]
  text: string
  muted: string
  bg: string
  stroke: string
  mode: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 90,
        top: y - 50,
        width: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          border: `1.5px solid ${stroke}`,
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: text,
          gap: 2,
          boxShadow: mode === "dark" ? `0 0 14px ${stroke}55` : "none",
        }}
      >
        <row.Icon size={26} color={text} />
        <div
          style={{
            fontSize: 9.5,
            marginTop: 2,
            letterSpacing: "0.04em",
            maxWidth: 78,
            textAlign: "center",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {row.company}
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 12.5, color: stroke, letterSpacing: "0.06em", whiteSpace: "nowrap", fontWeight: 500 }}>
        {row.tokens} <span style={{ color: muted, margin: "0 4px" }}>•</span> {row.price}
      </div>
    </div>
  )
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

  return (
    <div
      style={{
        width: W,
        height: H,
        background: bg,
        color: text,
        fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
        position: "relative",
        boxSizing: "border-box",
        padding: 36,
        letterSpacing: "0.04em",
      }}
    >
      <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <CornerBracket x={24} y={24} dir="tl" color={muted} />
        <CornerBracket x={W - 24} y={24} dir="tr" color={muted} />
        <CornerBracket x={24} y={H - 24} dir="bl" color={muted} />
        <CornerBracket x={W - 24} y={H - 24} dir="br" color={muted} />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          right: 60,
          bottom: 60,
          border: `1px solid ${panelStroke}`,
          borderRadius: 18,
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "absolute", top: 86, left: 110, fontSize: 17, color: text, letterSpacing: "0.18em" }}>
        [ SECONDARY MARKET ]
      </div>
      <div style={{ position: "absolute", top: 86, right: 110, fontSize: 17, color: text, letterSpacing: "0.18em" }}>
        PEER-TO-PEER LIQUIDITY
      </div>

      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: "0.32em", color: accent }}>
        SECONDARY MARKET
      </div>
      <div
        style={{
          position: "absolute",
          top: 195,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 1,
          background: accent,
          opacity: 0.8,
        }}
      />

      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
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

        <g>
          <rect
            x={hubLeft}
            y={hubTop}
            width={hubRight - hubLeft}
            height={hubBot - hubTop}
            rx="20"
            fill={mode === "dark" ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.012)"}
            stroke={panelStroke}
            strokeWidth="1.2"
          />
          {(
            [
              [hubLeft, hubTop],
              [hubRight, hubTop],
              [hubLeft, hubBot],
              [hubRight, hubBot],
            ] as [number, number][]
          ).map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4.5" fill={bg} stroke={accent} strokeWidth="1.3" />
          ))}
          {Array.from({ length: 22 }).map((_, r) =>
            Array.from({ length: 10 }).map((__, c) => (
              <circle
                key={`${r}-${c}`}
                cx={hubLeft + 22 + c * 30}
                cy={hubTop + 28 + r * 30}
                r="1"
                fill={panelStroke}
                opacity={mode === "dark" ? 0.55 : 0.7}
              />
            ))
          )}
          <text x={hubCenterX} y={244} fill={accent} fontSize="22" textAnchor="middle" letterSpacing="8" fontFamily="inherit">
            MARKET
          </text>
        </g>

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
            <g key={i} filter={filt}>
              <path d={`M ${x_s_r} ${y} L ${x_t_l} ${y}`} stroke={lc} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path
                d={`M ${x_t_r} ${y} C ${(x_t_r + x_h_l) / 2} ${y}, ${(x_t_r + x_h_l) / 2} ${y} , ${x_h_l} ${y}`}
                stroke={lc}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path d={`M ${x_h_l} ${y} L ${x_h_r} ${exitY}`} stroke={lc} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path
                d={`M ${x_h_r} ${exitY} C ${(x_h_r + x_b_l) / 2} ${exitY}, ${(x_h_r + x_b_l) / 2} ${exitY}, ${x_b_l} ${exitY}`}
                stroke={lc}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx={x_h_l} cy={y} r="4" fill={lc} />
              <circle cx={x_h_r} cy={exitY} r="4" fill={lc} />
              <circle cx={x_s_r + 4} cy={y} r="3.5" fill={lc} />
              <circle cx={x_b_l - 4} cy={exitY} r="3.5" fill={lc} />
            </g>
          )
        })}
      </svg>

      {ROWS.map((row, i) => {
        const y = rowYs[i]
        const lc = lineColors[i]
        const buyerY = hubExitYs[exitRowMap[i]]
        return (
          <div key={i}>
            <NameCircle x={sellerX} y={y} label={row.seller} stroke={lc} text={text} bg={bg} mode={mode} />
            <NameCircle x={buyerX} y={buyerY} label={row.buyer} stroke={lc} text={text} bg={bg} mode={mode} />
            <TokenNode x={tokenX} y={y} row={row} text={text} muted={muted} bg={bg} stroke={lc} mode={mode} />
          </div>
        )
      })}
    </div>
  )
}
