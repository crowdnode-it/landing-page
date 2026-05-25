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

  const font = '"JetBrains Mono", monospace'

  // --- Chart calculations ---
  const chartContainerX = 88
  const chartContainerY = 728
  const chartContainerW = 1272
  const chartContainerH = 280

  const cW = 1280
  const cH = 280
  const chartX = 70
  const chartY = 30
  const chartW = cW - 110
  const chartH = cH - 80
  const yMax = 25
  const yMin = 0
  const points = GROWTH.map((v, i) => {
    const x = chartX + (i / (GROWTH.length - 1)) * chartW
    const y = chartY + (1 - (v - yMin) / (yMax - yMin)) * chartH
    return [x, y]
  })
  const linePath = smoothPath(points)
  const areaPath =
    linePath +
    ` L ${points[points.length - 1][0]} ${chartY + chartH} L ${points[0][0]} ${chartY + chartH} Z`
  const lastPt = points[points.length - 1]
  const gradId = `grad-${accent.replace("#", "")}`

  // --- Timeline calculations ---
  const N = QUARTERS.length
  const timelineStartX = 176
  const timelineEndX = 1336
  const timelineXs = Array.from(
    { length: N },
    (_, i) => timelineStartX + (i / (N - 1)) * (timelineEndX - timelineStartX)
  )
  const timelineY = 310

  // --- Panel inner region ---
  const panelX = 60
  const panelY = 60
  const panelW = 1328
  const panelH = 966
  const innerX = panelX + 56
  const innerY = panelY + 46

  return (
    <svg viewBox="0 0 1448 1086" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="0" y="0" width="1448" height="1086" fill={bg} />

      {/* Corner brackets */}
      <path d={`M24 ${24 + 28} V24 H${24 + 28}`} stroke={muted} strokeWidth="2" fill="none" />
      <path d={`M${1424 - 28} 24 H1424 V${24 + 28}`} stroke={muted} strokeWidth="2" fill="none" />
      <path d={`M24 ${1062 - 28} V1062 H${24 + 28}`} stroke={muted} strokeWidth="2" fill="none" />
      <path d={`M${1424 - 28} 1062 H1424 V${1062 - 28}`} stroke={muted} strokeWidth="2" fill="none" />

      {/* Main panel border */}
      <rect
        x={panelX}
        y={panelY}
        width={panelW}
        height={panelH}
        rx="18"
        ry="18"
        fill="none"
        stroke={panelStroke}
        strokeWidth="1"
      />

      {/* ===================== HEADER ===================== */}
      <g transform={`translate(${innerX}, ${innerY})`}>
        {/* Sparkle icon */}
        <g transform="translate(0, -16)">
          <svg x="0" y="0" width="56" height="56" viewBox="0 0 56 56">
            <path
              d="M28 4 L 31 22 L 49 25 L 31 28 L 28 46 L 25 28 L 7 25 L 25 22 Z"
              fill={accent}
            />
            <path
              d="M44 8 L 45.5 14 L 51 15.5 L 45.5 17 L 44 23 L 42.5 17 L 37 15.5 L 42.5 14 Z"
              fill={accent}
              opacity="0.85"
            />
            <path
              d="M10 36 L 11 40 L 15 41 L 11 42 L 10 46 L 9 42 L 5 41 L 9 40 Z"
              fill={accent}
              opacity="0.7"
            />
          </svg>
        </g>

        {/* AURA SYSTEMS text */}
        <text
          x="78"
          y="14"
          fill={text}
          fontSize="38"
          fontFamily={font}
          fontWeight="500"
          letterSpacing="0.18em"
        >
          AURA SYSTEMS
        </text>

        {/* Position value (right side) */}
        <text
          x="1100"
          y="6"
          fill={muted}
          fontSize="16"
          fontFamily={font}
          letterSpacing="0.18em"
          textAnchor="end"
        >
          YOUR POSITION CURRENT VALUE:
        </text>
        <text
          x="1216"
          y="14"
          fill={accent}
          fontSize="34"
          fontFamily={font}
          fontWeight="500"
          letterSpacing="0.06em"
          textAnchor="end"
        >
          20 k&euro;
        </text>
      </g>

      {/* Horizontal divider */}
      <line
        x1={innerX}
        y1={innerY + 40}
        x2={innerX + panelW - 112}
        y2={innerY + 40}
        stroke={panelStroke}
        strokeWidth="1"
      />

      {/* ===================== TIMELINE ===================== */}
      {/* Doc icons row */}
      {timelineXs.map((x, i) => {
        const isFilled = i === N - 1
        const iconColor = isFilled ? accent : muted
        return (
          <g key={`doc-${i}`} transform={`translate(${x - 24}, ${timelineY - 70})`}>
            <svg width="48" height="56.64" viewBox="0 0 40 48">
              <path
                d="M6 4 H 26 L 34 12 V 44 H 6 Z"
                fill={isFilled ? iconColor : "none"}
                fillOpacity={isFilled ? 0.18 : 0}
                stroke={iconColor}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 4 V 12 H 34"
                fill="none"
                stroke={iconColor}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 20 H 28 M12 26 H 28 M12 32 H 22"
                fill="none"
                stroke={iconColor}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </g>
        )
      })}

      {/* Connector line */}
      <line
        x1={timelineXs[0]}
        y1={timelineY}
        x2={timelineXs[N - 1]}
        y2={timelineY}
        stroke={panelStroke}
        strokeWidth="1.4"
      />

      {/* Dots on connector line */}
      {timelineXs.map((x, i) => (
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={timelineY}
          r={i === N - 1 ? 7 : 5.5}
          fill={i === N - 1 ? accent : bg}
          stroke={i === N - 1 ? accent : muted}
          strokeWidth="1.4"
        />
      ))}

      {/* Quarter labels under dots */}
      {timelineXs.map((x, i) => (
        <g key={`label-${i}`}>
          <text
            x={x}
            y={timelineY + 34}
            fill={i === N - 1 ? accent : muted}
            fontSize="14"
            fontFamily={font}
            letterSpacing="0.22em"
            textAnchor="middle"
          >
            REPORT
          </text>
          <text
            x={x}
            y={timelineY + 58}
            fill={i === N - 1 ? accent : muted}
            fontSize="14"
            fontFamily={font}
            fontWeight={i === N - 1 ? 600 : 400}
            letterSpacing="0.22em"
            textAnchor="middle"
          >
            {QUARTERS[i].toUpperCase()}
          </text>
        </g>
      ))}

      {/* ===================== FOUNDER SECTION ===================== */}
      {/* Left column: Founder's Strategic Overview */}
      <g transform={`translate(${innerX}, 430)`}>
        <text
          x="0"
          y="0"
          fill={accent}
          fontSize="18"
          fontFamily={font}
          letterSpacing="0.16em"
        >
          {"FOUNDER’S STRATEGIC OVERVIEW (Q2 2026)"}
        </text>
        <text
          fill={text}
          fontSize="17"
          fontFamily={font}
          opacity="0.92"
        >
          <tspan x="0" dy="34">
            We are pleased with the overall resilient
          </tspan>
          <tspan x="0" dy="28">
            performance of the portfolio in private
          </tspan>
          <tspan x="0" dy="28">
            markets. We continue to see robust growth
          </tspan>
          <tspan x="0" dy="28">
            in our key sectors, with a particular focus
          </tspan>
          <tspan x="0" dy="28">
            on supporting the next generation of
          </tspan>
          <tspan x="0" dy="28">
            Climate Tech solutions.
          </tspan>
        </text>
      </g>

      {/* Right column: Founder's Comments card */}
      <rect
        x="736"
        y="410"
        width="620"
        height="180"
        rx="12"
        ry="12"
        fill={panelFill}
        stroke={panelStroke}
        strokeWidth="1"
      />
      <g transform="translate(760, 440)">
        {/* Accent dot */}
        <circle cx="4" cy="6" r="4" fill={accent} />
        <text
          x="20"
          y="11"
          fill={accent}
          fontSize="17"
          fontFamily={font}
          letterSpacing="0.14em"
        >
          {"FOUNDER’S COMMENTS:"}
        </text>
        <text
          fill={text}
          fontSize="17"
          fontFamily={font}
          opacity="0.92"
        >
          <tspan x="20" dy="38">
            The outperformance of the AI / Software
          </tspan>
          <tspan x="20" dy="28">
            sector has been a significant driver this
          </tspan>
          <tspan x="20" dy="28">
            quarter. We are monitoring Fintech for
          </tspan>
          <tspan x="20" dy="28">
            new opportunities.
          </tspan>
        </text>
      </g>

      {/* ===================== CHART SECTION ===================== */}
      {/* Chart container panel */}
      <rect
        x={chartContainerX}
        y={chartContainerY - 48}
        width={chartContainerW}
        height={chartContainerH + 74}
        rx="12"
        ry="12"
        fill={panelFill}
        stroke={panelStroke}
        strokeWidth="1"
      />

      {/* Chart title */}
      <text
        x={chartContainerX + 28}
        y={chartContainerY - 14}
        fill={accent}
        fontSize="18"
        fontFamily={font}
        letterSpacing="0.16em"
      >
        AURA SYSTEMS VALUE GROWTH OVER TIME
      </text>

      {/* Chart SVG region */}
      <g transform={`translate(${chartContainerX}, ${chartContainerY})`}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y-axis label (rotated) */}
        <text
          x="14"
          y={chartY + chartH / 2}
          fill={muted}
          fontSize="12"
          fontFamily={font}
          letterSpacing="2"
          textAnchor="middle"
          transform={`rotate(-90 14 ${chartY + chartH / 2})`}
        >
          TOTAL VALUE IN &euro;
        </text>

        {/* Grid lines + Y-axis tick labels */}
        {[5, 10, 15, 20, 25].map((v) => {
          const y = chartY + (1 - (v - yMin) / (yMax - yMin)) * chartH
          return (
            <g key={v}>
              <line
                x1={chartX}
                y1={y}
                x2={chartX + chartW}
                y2={y}
                stroke={panelStroke}
                strokeWidth="0.6"
                strokeDasharray="2 4"
                opacity="0.6"
              />
              <text
                x={chartX - 8}
                y={y + 4}
                fill={muted}
                fontSize="12"
                fontFamily={font}
                textAnchor="end"
              >
                &euro;{v}k
              </text>
            </g>
          )
        })}

        {/* Area fill under curve */}
        <path d={areaPath} fill={`url(#${gradId})`} />

        {/* Growth curve line */}
        <path d={linePath} stroke={accent} strokeWidth="2.4" fill="none" />

        {/* Endpoint circle */}
        <circle
          cx={lastPt[0]}
          cy={lastPt[1]}
          r="7"
          fill={bg}
          stroke={accent}
          strokeWidth="2"
        />

        {/* X-axis quarter labels */}
        {QUARTERS.map((q, i) => {
          const x = chartX + (i / (QUARTERS.length - 1)) * chartW
          return (
            <text
              key={i}
              x={x}
              y={chartY + chartH + 28}
              fill={muted}
              fontSize="13"
              fontFamily={font}
              textAnchor="middle"
              letterSpacing="2"
            >
              {q.toUpperCase()}
            </text>
          )
        })}

        {/* Value chip at endpoint */}
        <g transform={`translate(${lastPt[0] + 18} ${lastPt[1] - 18})`}>
          <rect
            x="0"
            y="0"
            width="64"
            height="32"
            rx="6"
            fill={panelFill}
            stroke={accent}
            strokeWidth="1.4"
          />
          <text
            x="32"
            y="21"
            fill={accent}
            fontSize="15"
            fontFamily={font}
            textAnchor="middle"
          >
            &euro;20k
          </text>
        </g>
      </g>
    </svg>
  )
}
