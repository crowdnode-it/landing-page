import { CornerBracket } from "./icons"
import type { GraphicPalette } from "./types"

const SECTORS = [
  { name: ["HEALTH", "TECH"], pct: 17 },
  { name: ["AI /", "SOFTWARE"], pct: 20 },
  { name: ["CLIMATE", "TECH"], pct: 16 },
  { name: ["FINTECH"], pct: 18 },
  { name: ["MOBILITY"], pct: 15 },
  { name: ["ENERGY"], pct: 14 },
]

/* ── Inline icon paths (from icons.tsx, viewBox 0 0 64 64) ─────────── */

function HeartPulsePaths({ sw }: { sw: number }) {
  return (
    <>
      <path d="M32 54 C 14 42, 6 30, 10 20 C 14 10, 26 10, 32 20 C 38 10, 50 10, 54 20 C 58 30, 50 42, 32 54 Z" strokeWidth={sw} />
      <path d="M10 32 H 22 L 26 24 L 32 40 L 36 30 L 40 34 H 54" strokeWidth={sw} />
    </>
  )
}

function BrainCircuitPaths({ sw }: { sw: number }) {
  return (
    <>
      <path d="M28 14 C 20 14, 16 20, 16 26 C 12 28, 12 36, 16 38 C 16 46, 22 50, 28 50 V 14 Z" strokeWidth={sw} />
      <path d="M36 14 C 44 14, 48 20, 48 26 C 52 28, 52 36, 48 38 C 48 46, 42 50, 36 50 V 14 Z" strokeWidth={sw} />
      <circle cx="22" cy="24" r="1.6" fill="currentColor" strokeWidth={sw} />
      <circle cx="22" cy="38" r="1.6" fill="currentColor" strokeWidth={sw} />
      <circle cx="42" cy="24" r="1.6" fill="currentColor" strokeWidth={sw} />
      <circle cx="42" cy="38" r="1.6" fill="currentColor" strokeWidth={sw} />
      <path d="M22 24 H 14 M22 38 H 14 M42 24 H 50 M42 38 H 50" strokeWidth={sw} />
      <path d="M50 24 L 56 22 M50 38 L 56 40 M14 24 L 8 22 M14 38 L 8 40" strokeWidth={sw} />
      <circle cx="56" cy="22" r="1.4" strokeWidth={sw} />
      <circle cx="56" cy="40" r="1.4" strokeWidth={sw} />
      <circle cx="8" cy="22" r="1.4" strokeWidth={sw} />
      <circle cx="8" cy="40" r="1.4" strokeWidth={sw} />
    </>
  )
}

function LeafPaths({ sw }: { sw: number }) {
  return (
    <>
      <path d="M48 12 C 24 12, 14 26, 14 42 C 14 50, 18 54, 22 54 C 38 54, 52 42, 52 18 C 52 14, 50 12, 48 12 Z" strokeWidth={sw} />
      <path d="M20 52 L 44 22" strokeWidth={sw} />
    </>
  )
}

function BankPaths({ sw }: { sw: number }) {
  return (
    <>
      <path d="M10 24 L 32 12 L 54 24 Z" strokeWidth={sw} />
      <path d="M10 26 H 54" strokeWidth={sw} />
      <path d="M16 28 V 48 M26 28 V 48 M38 28 V 48 M48 28 V 48" strokeWidth={sw} />
      <path d="M8 50 H 56" strokeWidth={sw} />
      <path d="M8 54 H 56" strokeWidth={sw} />
    </>
  )
}

function CarPaths({ sw }: { sw: number }) {
  return (
    <>
      <path d="M8 42 V 32 C 8 30, 9 28, 12 27 L 18 18 C 19 16, 21 16, 22 16 H 42 C 44 16, 45 16, 46 18 L 52 27 C 55 28, 56 30, 56 32 V 42 H 48" strokeWidth={sw} />
      <path d="M16 42 H 8" strokeWidth={sw} />
      <path d="M48 42 H 56" strokeWidth={sw} />
      <path d="M12 28 H 52" strokeWidth={sw} />
      <circle cx="20" cy="44" r="5" strokeWidth={sw} />
      <circle cx="44" cy="44" r="5" strokeWidth={sw} />
    </>
  )
}

function BoltPaths({ sw }: { sw: number }) {
  return (
    <path d="M36 6 L 14 36 H 30 L 26 58 L 50 28 H 34 Z" strokeWidth={sw} />
  )
}

const ICON_PATHS = [HeartPulsePaths, BrainCircuitPaths, LeafPaths, BankPaths, CarPaths, BoltPaths]

/* ── Main component ──────────────────────────────────────────────────── */

export function StartKit({ palette }: { palette: GraphicPalette }) {
  const p = palette
  const bg = p.background
  const panelStroke = p.panelStroke
  const panelFill = p.panelFill
  const text = p.text
  const muted = p.muted
  const accent = p.accent

  const mono = '"JetBrains Mono", monospace'
  const ls = "0.18em"

  /* Card grid constants */
  const gridLeft = 90
  const gridTotalW = 1074
  const cardGap = 18
  const cardW = (gridTotalW - 5 * cardGap) / 6 // 164
  const cardXs = Array.from({ length: 6 }, (_, i) => gridLeft + i * (cardW + cardGap))
  const cardTop = 350
  const cardH = 280
  const cardR = 14

  /* Bar chart constants */
  const chartW = 800
  const chartH = 220
  const barW = 60
  const colGap = (chartW - 80 - barW * 6) / 5
  const maxPct = 20

  /* Portfolio panel */
  const panelTop = 770
  const panelLeft = 130
  const panelRight = 130
  const panelW = 1254 - panelLeft - panelRight // 994
  const panelBottom = 130
  const panelH = 1254 - panelTop - panelBottom // 354

  return (
    <svg viewBox="0 0 1254 1254" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="0" y="0" width="1254" height="1254" fill={bg} />

      {/* Corner brackets */}
      <CornerBracket x={32} y={32} dir="tl" color={text} />
      <CornerBracket x={1222} y={32} dir="tr" color={text} />
      <CornerBracket x={32} y={1222} dir="bl" color={text} />
      <CornerBracket x={1222} y={1222} dir="br" color={text} />

      {/* Panel border */}
      <rect
        x={80} y={80}
        width={1254 - 160} height={1254 - 160}
        rx={18} ry={18}
        fill="none" stroke={panelStroke} strokeWidth={1}
      />

      {/* ── Header ────────────────────────────────────────────────── */}
      <text x={130} y={128} fill={text} fontSize={17} fontFamily={mono} letterSpacing={ls}>
        {"[ PORTFOLIO BUILDER ]"}
      </text>
      <text x={1124} y={128} fill={text} fontSize={17} fontFamily={mono} letterSpacing={ls} textAnchor="end">
        DIVERSIFIED BY DESIGN
      </text>

      {/* Dashed separator under header */}
      <line x1={130} y1={156} x2={1124} y2={156} stroke={panelStroke} strokeDasharray="6 6" strokeWidth={1} />

      {/* ── Title ─────────────────────────────────────────────────── */}
      <text x={627} y={240} fill={text} fontSize={30} fontFamily={mono} letterSpacing={ls} textAnchor="middle">
        6 STARTUPS. 6 SECTORS.
      </text>
      <text x={627} y={282} fill={accent} fontSize={30} fontFamily={mono} letterSpacing={ls} textAnchor="middle">
        1 DIVERSIFIED PORTFOLIO.
      </text>

      {/* ── Sector Cards ──────────────────────────────────────────── */}
      {SECTORS.map((s, i) => {
        const cx = cardXs[i]
        const IconPaths = ICON_PATHS[i]
        const iconSize = 64
        const iconCx = cx + cardW / 2 // centre x of card
        const iconY = cardTop + 22
        const dotY = iconY + iconSize + 14
        const textY = dotY + 7 + 18
        const chipY = cardTop + cardH - 18 - 40

        return (
          <g key={i}>
            {/* Card background */}
            <rect
              x={cx} y={cardTop}
              width={cardW} height={cardH}
              rx={cardR} ry={cardR}
              fill={panelFill} stroke={panelStroke} strokeWidth={1}
            />

            {/* Icon (64x64 viewBox mapped into card centre) */}
            <g
              transform={`translate(${iconCx - iconSize / 2}, ${iconY})`}
              fill="none" stroke={text} strokeLinecap="round" strokeLinejoin="round"
            >
              <SectorIcon IconPaths={IconPaths} sw={1.6} />
            </g>

            {/* Accent dot */}
            <circle cx={iconCx} cy={dotY} r={3.5} fill={accent} />

            {/* Sector name (1 or 2 lines) */}
            {s.name.map((n, j) => (
              <text
                key={j}
                x={iconCx} y={textY + j * 21}
                fill={text} fontSize={15}
                fontFamily={mono} letterSpacing={ls}
                textAnchor="middle"
              >
                {n}
              </text>
            ))}

            {/* Percentage chip */}
            <rect
              x={cx + 14} y={chipY}
              width={cardW - 28} height={40}
              rx={8} ry={8}
              fill={p.chipFill} stroke={panelStroke} strokeWidth={1}
            />
            <text
              x={iconCx} y={chipY + 26}
              fill={accent} fontSize={18}
              fontFamily={mono} letterSpacing="0.06em"
              textAnchor="middle"
            >
              {s.pct}%
            </text>
          </g>
        )
      })}

      {/* ── Dashed connectors from cards to portfolio panel ─────── */}
      <g>
        {(() => {
          const connTop = cardTop + cardH // 630
          const targetX = gridLeft + gridTotalW / 2 // 627
          const xs = cardXs.map(cx => cx + cardW / 2)
          return xs.map((x, i) => (
            <path
              key={i}
              d={`M${x} ${connTop} V ${connTop + 40} Q ${x} ${connTop + 60} ${(x + targetX) / 2} ${connTop + 60} Q ${targetX} ${connTop + 60} ${targetX} ${connTop + 80} V ${connTop + 90}`}
              stroke={panelStroke}
              strokeDasharray="5 5"
              strokeWidth={1}
              fill="none"
            />
          ))
        })()}
        <polygon
          points={`${gridLeft + gridTotalW / 2 - 6},${cardTop + cardH + 90} ${gridLeft + gridTotalW / 2 + 6},${cardTop + cardH + 90} ${gridLeft + gridTotalW / 2},${cardTop + cardH + 100}`}
          fill={panelStroke}
        />
      </g>

      {/* ── Portfolio panel ────────────────────────────────────────── */}
      <rect
        x={panelLeft} y={panelTop}
        width={panelW} height={panelH}
        rx={18} ry={18}
        fill={panelFill} stroke={panelStroke} strokeWidth={1}
      />

      {/* Pie icon area */}
      {(() => {
        const pieCx = panelLeft + panelW / 2
        const pieY = panelTop + 38
        const pieR = 36
        return (
          <g>
            {/* Outer dashed ring */}
            <circle cx={pieCx} cy={pieY + pieR} r={32} stroke={accent} strokeWidth={1.4} fill="none" opacity={0.5} strokeDasharray="4 5" />
            {/* Inner solid ring */}
            <circle cx={pieCx} cy={pieY + pieR} r={26} stroke={accent} strokeWidth={1.4} fill="none" opacity={0.7} />
            {/* Pie icon (viewBox 0 0 64 64, rendered at 48x48 centred) */}
            <g
              transform={`translate(${pieCx - 24}, ${pieY + pieR - 24})`}
              fill="none" stroke={accent} strokeLinecap="round" strokeLinejoin="round"
            >
              <g transform="scale(0.75)">
                <path d="M32 14 V 32 L 48 40 A 18 18 0 1 1 32 14 Z" fill={accent} fillOpacity={0.9} strokeWidth={1.4} />
                <path d="M34 12 A 18 18 0 0 1 52 30 H 34 Z" strokeWidth={1.4} />
              </g>
            </g>
          </g>
        )
      })()}

      {/* "DIVERSIFIED PORTFOLIO" label */}
      <text
        x={panelLeft + panelW / 2} y={panelTop + 128}
        fill={text} fontSize={22}
        fontFamily={mono} letterSpacing={ls}
        textAnchor="middle"
      >
        DIVERSIFIED PORTFOLIO
      </text>

      {/* "PRIVATE MARKETS" sub-label */}
      <text
        x={panelLeft + panelW / 2} y={panelTop + 150}
        fill={muted} fontSize={14}
        fontFamily={mono} letterSpacing="0.32em"
        textAnchor="middle"
      >
        PRIVATE MARKETS
      </text>

      {/* Dashed divider */}
      <line
        x1={panelLeft + 50} y1={panelTop + 174}
        x2={panelLeft + panelW - 50} y2={panelTop + 174}
        stroke={panelStroke} strokeDasharray="6 6" strokeWidth={1}
      />

      {/* ALLOCATION / total % */}
      <text
        x={panelLeft + 50} y={panelTop + 200}
        fill={muted} fontSize={14}
        fontFamily={mono} letterSpacing="0.22em"
      >
        ALLOCATION
      </text>
      <text
        x={panelLeft + panelW - 50} y={panelTop + 200}
        fill={muted} fontSize={14}
        fontFamily={mono} letterSpacing="0.22em"
        textAnchor="end"
      >
        {SECTORS.reduce((a, s) => a + s.pct, 0)}%
      </text>

      {/* ── Bar chart ─────────────────────────────────────────────── */}
      <g transform={`translate(${panelLeft + (panelW - chartW) / 2}, ${panelTop + 210})`}>
        {SECTORS.map((s, i) => {
          const x = 40 + i * (barW + colGap)
          const fullH = (s.pct / maxPct) * chartH
          const topH = fullH * 0.42
          const botH = fullH - topH
          const yTop = chartH - fullH
          return (
            <g key={i}>
              <rect x={x} y={yTop} width={barW} height={topH} fill={accent} rx={2} />
              <rect x={x} y={yTop + topH} width={barW} height={botH} fill={p.barDark} rx={2} />
              <text
                x={x + barW / 2} y={chartH + 32}
                fill={accent} fontSize={20}
                fontFamily={mono} letterSpacing="2"
                textAnchor="middle"
              >
                {s.pct}%
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/* Helper: render the correct icon paths for a given sector */
function SectorIcon({ IconPaths, sw }: { IconPaths: React.ComponentType<{ sw: number }>; sw: number }) {
  return <IconPaths sw={sw} />
}
