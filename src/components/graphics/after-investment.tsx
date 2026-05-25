import { SparkleIcon, DocIcon, CornerBracket } from "./icons"
import type { GraphicPalette } from "./types"

const QUARTERS = ["Q4 2024", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"]
const GROWTH = [9, 11, 12.3, 11.5, 14, 14.8, 14, 14.5, 15, 16.5, 18, 18.3, 17.5, 18.5, 20]

function smoothPath(pts: number[][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const cx = (x0 + x1) / 2
    d += ` Q ${cx} ${y0} ${cx} ${(y0 + y1) / 2} T ${x1} ${y1}`
  }
  return d
}

export function AfterInvestment({ palette }: { palette: GraphicPalette }) {
  const p = palette
  const bg = p.background
  const panelStroke = p.panelStroke
  const panelFill = p.panelFill
  const text = p.text
  const muted = p.muted
  const accent = p.accent

  const W = 1280
  const H = 280
  const chartX = 70
  const chartY = 30
  const chartW = W - 110
  const chartH = H - 80
  const yMax = 25
  const yMin = 0
  const points = GROWTH.map((v, i) => {
    const x = chartX + (i / (GROWTH.length - 1)) * chartW
    const y = chartY + (1 - (v - yMin) / (yMax - yMin)) * chartH
    return [x, y]
  })
  const linePath = smoothPath(points)
  const areaPath = linePath + ` L ${points[points.length - 1][0]} ${chartY + chartH} L ${points[0][0]} ${chartY + chartH} Z`
  const lastPt = points[points.length - 1]
  const gradId = `grad-${accent.replace("#", "")}`

  return (
    <div
      style={{
        width: 1448,
        height: 1086,
        background: bg,
        color: text,
        fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
        position: "relative",
        boxSizing: "border-box",
        padding: 36,
        letterSpacing: "0.04em",
      }}
    >
      <svg width="1448" height="1086" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <CornerBracket x={24} y={24} dir="tl" color={muted} />
        <CornerBracket x={1424} y={24} dir="tr" color={muted} />
        <CornerBracket x={24} y={1062} dir="bl" color={muted} />
        <CornerBracket x={1424} y={1062} dir="br" color={muted} />
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
          padding: "46px 56px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ color: accent }}>
              <SparkleIcon size={56} color={accent} />
            </div>
            <div style={{ fontSize: 38, color: text, letterSpacing: "0.18em", fontWeight: 500 }}>AURA SYSTEMS</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 22, color: muted, fontSize: 16, letterSpacing: "0.18em" }}>
            <span>YOUR POSITION CURRENT VALUE:</span>
            <span style={{ color: accent, fontSize: 34, letterSpacing: "0.06em", fontWeight: 500 }}>20 k€</span>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${panelStroke}`, marginTop: 26 }} />

        <div style={{ position: "relative", height: 200, marginTop: 36 }}>
          {(() => {
            const N = QUARTERS.length
            const startX = 60
            const endX = 1220
            const xs = Array.from({ length: N }, (_, i) => startX + (i / (N - 1)) * (endX - startX))
            const lineY = 96
            return (
              <>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 70 }}>
                  {xs.map((x, i) => (
                    <div key={i} style={{ position: "absolute", left: `calc(${(x / 1280) * 100}% - 24px)`, top: 0 }}>
                      <DocIcon size={48} stroke={1.4} filled={i === N - 1} color={i === N - 1 ? accent : muted} />
                    </div>
                  ))}
                </div>
                <svg
                  width="100%"
                  height="200"
                  style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                  viewBox="0 0 1280 200"
                  preserveAspectRatio="none"
                >
                  <line x1={startX} y1={lineY} x2={endX} y2={lineY} stroke={panelStroke} strokeWidth="1.4" />
                  {xs.map((x, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={lineY}
                      r={i === N - 1 ? 7 : 5.5}
                      fill={i === N - 1 ? accent : bg}
                      stroke={i === N - 1 ? accent : muted}
                      strokeWidth="1.4"
                    />
                  ))}
                </svg>
                <div style={{ position: "absolute", top: 120, left: 0, right: 0 }}>
                  {xs.map((x, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: `calc(${(x / 1280) * 100}% - 70px)`,
                        top: 0,
                        width: 140,
                        textAlign: "center",
                        fontSize: 14,
                        letterSpacing: "0.22em",
                        color: i === N - 1 ? accent : muted,
                        lineHeight: 1.7,
                      }}
                    >
                      <div>REPORT</div>
                      <div style={{ fontWeight: i === N - 1 ? 600 : 400 }}>{QUARTERS[i].toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </>
            )
          })()}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginTop: 40 }}>
          <div>
            <div style={{ color: accent, fontSize: 18, letterSpacing: "0.16em", marginBottom: 18 }}>
              FOUNDER&apos;S STRATEGIC OVERVIEW (Q2 2026)
            </div>
            <div style={{ color: text, fontSize: 17, lineHeight: 1.65, opacity: 0.92 }}>
              We are pleased with the overall resilient performance of the portfolio in private markets. We continue to see robust growth in our key sectors, with a particular focus on supporting the next generation of Climate Tech solutions.
            </div>
          </div>
          <div style={{ border: `1px solid ${panelStroke}`, borderRadius: 12, padding: "20px 24px", background: panelFill }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, display: "inline-block", flexShrink: 0 }} />
              <span style={{ color: accent, fontSize: 17, letterSpacing: "0.14em", flexShrink: 0 }}>FOUNDER&apos;S COMMENTS:</span>
              <span style={{ color: text, fontSize: 17, lineHeight: 1.6, opacity: 0.92 }}>
                The outperformance of the AI / Software sector has been a significant driver this quarter. We are monitoring Fintech for new opportunities.
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 36, border: `1px solid ${panelStroke}`, borderRadius: 12, padding: "22px 28px 18px", background: panelFill }}>
          <div style={{ color: accent, fontSize: 18, letterSpacing: "0.16em", marginBottom: 10 }}>
            AURA SYSTEMS VALUE GROWTH OVER TIME
          </div>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
                <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <text x="14" y={chartY + chartH / 2} fill={muted} fontSize="12" letterSpacing="2" transform={`rotate(-90 14 ${chartY + chartH / 2})`} textAnchor="middle">
              TOTAL VALUE IN €
            </text>
            {[5, 10, 15, 20, 25].map((v) => {
              const y = chartY + (1 - (v - yMin) / (yMax - yMin)) * chartH
              return (
                <g key={v}>
                  <line x1={chartX} y1={y} x2={chartX + chartW} y2={y} stroke={panelStroke} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.6" />
                  <text x={chartX - 8} y={y + 4} fill={muted} fontSize="12" textAnchor="end" fontFamily="inherit">
                    €{v}k
                  </text>
                </g>
              )
            })}
            <path d={areaPath} fill={`url(#${gradId})`} />
            <path d={linePath} stroke={accent} strokeWidth="2.4" fill="none" />
            <circle cx={lastPt[0]} cy={lastPt[1]} r="7" fill={bg} stroke={accent} strokeWidth="2" />
            {QUARTERS.map((q, i) => {
              const x = chartX + (i / (QUARTERS.length - 1)) * chartW
              return (
                <text key={i} x={x} y={chartY + chartH + 28} fill={muted} fontSize="13" textAnchor="middle" letterSpacing="2">
                  {q.toUpperCase()}
                </text>
              )
            })}
            <g transform={`translate(${lastPt[0] + 18} ${lastPt[1] - 18})`}>
              <rect x="0" y="0" width="64" height="32" rx="6" fill={panelFill} stroke={accent} strokeWidth="1.4" />
              <text x="32" y="21" fill={accent} fontSize="15" textAnchor="middle" fontFamily="inherit">
                €20k
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
