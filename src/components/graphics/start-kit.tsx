import { HeartPulseIcon, BrainCircuitIcon, LeafIcon, BankIcon, CarIcon, BoltIcon, PieIcon, CornerBracket } from "./icons"
import type { GraphicPalette } from "./types"

const SECTORS = [
  { name: ["HEALTH", "TECH"], pct: 17, Icon: HeartPulseIcon },
  { name: ["AI /", "SOFTWARE"], pct: 20, Icon: BrainCircuitIcon },
  { name: ["CLIMATE", "TECH"], pct: 16, Icon: LeafIcon },
  { name: ["FINTECH"], pct: 18, Icon: BankIcon },
  { name: ["MOBILITY"], pct: 15, Icon: CarIcon },
  { name: ["ENERGY"], pct: 14, Icon: BoltIcon },
]

export function StartKit({ palette }: { palette: GraphicPalette }) {
  const p = palette
  const bg = p.background
  const panelStroke = p.panelStroke
  const panelFill = p.panelFill
  const text = p.text
  const muted = p.muted
  const accent = p.accent

  const chartW = 800
  const chartH = 220
  const barW = 60
  const colGap = (chartW - 80 - barW * 6) / 5
  const maxPct = 20

  return (
    <div
      style={{
        width: 1254,
        height: 1254,
        background: bg,
        color: text,
        fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
        position: "relative",
        boxSizing: "border-box",
        padding: 50,
        letterSpacing: "0.04em",
      }}
    >
      <svg width="1254" height="1254" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <CornerBracket x={32} y={32} dir="tl" color={text} />
        <CornerBracket x={1222} y={32} dir="tr" color={text} />
        <CornerBracket x={32} y={1222} dir="bl" color={text} />
        <CornerBracket x={1222} y={1222} dir="br" color={text} />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          right: 80,
          bottom: 80,
          border: `1px solid ${panelStroke}`,
          borderRadius: 18,
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 130,
          right: 130,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 17,
          color: text,
          letterSpacing: "0.18em",
        }}
      >
        <div>[ PORTFOLIO BUILDER ]</div>
        <div>DIVERSIFIED BY DESIGN</div>
      </div>

      <svg style={{ position: "absolute", top: 150, left: 130, width: 994, height: 12 }}>
        <line x1="0" y1="6" x2="994" y2="6" stroke={panelStroke} strokeDasharray="6 6" strokeWidth="1" />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 210,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          lineHeight: 1.35,
          color: text,
          letterSpacing: "0.18em",
        }}
      >
        <div>6 STARTUPS. 6 SECTORS.</div>
        <div style={{ color: accent, marginTop: 8 }}>1 DIVERSIFIED PORTFOLIO.</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 350,
          left: 90,
          right: 90,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 18,
        }}
      >
        {SECTORS.map((s, i) => (
          <div
            key={i}
            style={{
              background: panelFill,
              border: `1px solid ${panelStroke}`,
              borderRadius: 14,
              padding: "22px 14px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 280,
            }}
          >
            <div style={{ color: text, marginBottom: 14 }}>
              <s.Icon size={64} stroke={1.6} />
            </div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: accent, marginBottom: 14 }} />
            <div
              style={{
                fontSize: 15,
                textAlign: "center",
                letterSpacing: "0.18em",
                color: text,
                lineHeight: 1.35,
                minHeight: 44,
                marginBottom: 18,
              }}
            >
              {s.name.map((n, j) => (
                <div key={j}>{n}</div>
              ))}
            </div>
            <div
              style={{
                marginTop: "auto",
                alignSelf: "stretch",
                border: `1px solid ${panelStroke}`,
                borderRadius: 8,
                background: p.chipFill,
                padding: "10px 0",
                textAlign: "center",
                color: accent,
                fontSize: 18,
                letterSpacing: "0.06em",
              }}
            >
              {s.pct}%
            </div>
          </div>
        ))}
      </div>

      <svg style={{ position: "absolute", top: 640, left: 90, width: 1074, height: 100 }}>
        {(() => {
          const totalW = 1074
          const cardW = (totalW - 5 * 18) / 6
          const xs = Array.from({ length: 6 }, (_, i) => i * (cardW + 18) + cardW / 2)
          const targetX = totalW / 2
          return xs.map((x, i) => (
            <path
              key={i}
              d={`M${x} 0 V 40 Q ${x} 60 ${(x + targetX) / 2} 60 Q ${targetX} 60 ${targetX} 80 V 90`}
              stroke={panelStroke}
              strokeDasharray="5 5"
              strokeWidth="1"
              fill="none"
            />
          ))
        })()}
        <polygon points={`${1074 / 2 - 6},90 ${1074 / 2 + 6},90 ${1074 / 2},100`} fill={panelStroke} />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 770,
          left: 130,
          right: 130,
          bottom: 130,
          border: `1px solid ${panelStroke}`,
          borderRadius: 18,
          background: panelFill,
          padding: "38px 50px 30px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: 72, height: 72, margin: "0 auto", position: "relative", color: accent }}>
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ position: "absolute", inset: 0 }}>
            <circle cx="36" cy="36" r="32" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.5" strokeDasharray="4 5" />
            <circle cx="36" cy="36" r="26" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.7" />
          </svg>
          <div style={{ position: "absolute", inset: 12, color: accent }}>
            <PieIcon size={48} stroke={1.4} />
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 22, letterSpacing: "0.18em", color: text }}>
          DIVERSIFIED PORTFOLIO
        </div>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 14, letterSpacing: "0.32em", color: muted }}>
          PRIVATE MARKETS
        </div>
        <div style={{ margin: "24px 0 18px", borderTop: `1px dashed ${panelStroke}` }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, letterSpacing: "0.22em", color: muted }}>
          <div>ALLOCATION</div>
          <div>{SECTORS.reduce((a, s) => a + s.pct, 0)}%</div>
        </div>
        <svg
          width="100%"
          height={chartH + 50}
          viewBox={`0 0 ${chartW} ${chartH + 50}`}
          style={{ marginTop: 10, display: "block" }}
        >
          {SECTORS.map((s, i) => {
            const x = 40 + i * (barW + colGap)
            const fullH = (s.pct / maxPct) * chartH
            const topH = fullH * 0.42
            const botH = fullH - topH
            const yTop = chartH - fullH
            return (
              <g key={i}>
                <rect x={x} y={yTop} width={barW} height={topH} fill={accent} rx="2" />
                <rect
                  x={x}
                  y={yTop + topH}
                  width={barW}
                  height={botH}
                  fill={p.barDark}
                  rx="2"
                />
                <text x={x + barW / 2} y={chartH + 32} fill={accent} fontSize="20" textAnchor="middle" fontFamily="inherit" letterSpacing="2">
                  {s.pct}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
