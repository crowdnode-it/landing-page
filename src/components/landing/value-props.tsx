import {
  ArrowLeftRight,
  ArrowUpRight,
  Building2,
  MessageSquare,
  Sprout,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

import type { PersonaKey } from "@/lib/personas"

type ValueBlock = {
  id: string
  title: string
  body: string
  span: "big" | "wide" | "small"
  imageIndex: 1 | 2 | 3 | 4 | 5 | 6
  Icon: LucideIcon
  svgFile: string
}

const valueBlocks: ValueBlock[] = [
  {
    id: "tokens",
    title: "Startup Equity as Digital Tokens",
    body:
      "Our platform turns ownership into secure digital tokens, making it easier than ever to hold a stake in promising companies. You can finally own a real piece of a startup with the same simplicity as buying a stock online.",
    span: "big",
    imageIndex: 1,
    Icon: Building2,
    svgFile: "startup_equity_as_digital_tokens.svg",
  },
  {
    id: "founders",
    title: "Direct Communication with Founders",
    body:
      "You aren't just a number in a spreadsheet; you are a partner. Our platform opens a direct line to the people building the business, allowing you to ask questions and stay informed directly from the source.",
    span: "small",
    imageIndex: 4,
    Icon: MessageSquare,
    svgFile: "direct_communication_with_founders.svg",
  },
  {
    id: "sell",
    title: "Sell Your Equity When You Want",
    body:
      "Traditional startup investments are usually locked away for years, but we are changing that. Our platform provides a secondary market, giving you the freedom to trade or sell your shares whenever it suits your personal financial goals.",
    span: "small",
    imageIndex: 3,
    Icon: ArrowLeftRight,
    svgFile: "sell_your_equity_when_you_want.svg",
  },
  {
    id: "etf",
    title: 'Invest in a Startup "ETF"',
    body:
      "Instead of betting on just one company, you can easily spread your investment across a basket of different startups. This helps you build a balanced, diversified portfolio while reducing your overall risk.",
    span: "wide",
    imageIndex: 2,
    Icon: TrendingUp,
    svgFile: "invest_in_a_startup_etf.svg",
  },
  {
    id: "updates",
    title: "Active Communication During Investment",
    body:
      "We keep you in the loop throughout the entire journey, not just during the initial purchase. You will receive consistent updates on key milestones, challenges, and wins as the company evolves.",
    span: "wide",
    imageIndex: 5,
    Icon: Users,
    svgFile: "active_communication_during_investment.svg",
  },
  {
    id: "grow",
    title: "Help Startups Grow",
    body:
      "Your investment does more than just provide capital—it provides a voice. You can share your insights and expertise to help the companies you believe in succeed and reach their full potential.",
    span: "wide",
    imageIndex: 6,
    Icon: Sprout,
    svgFile: "help_startups_grow.svg",
  },
]

const personaImageNames: Record<PersonaKey, string> = {
  lara: "Lara",
  johann: "Johann",
  bob: "Bob",
}

function ValueIcon({ Icon, className }: { Icon: LucideIcon; className?: string }) {
  return <Icon className={className ?? "size-7"} strokeWidth={1.6} />
}

function ModalVisual({ item, persona }: { item: ValueBlock; persona: PersonaKey }) {
  const imageSrc = `/landing-images/${item.imageIndex}/${personaImageNames[persona]}.png`

  return (
    <div className="vp-image-wrap" aria-hidden="true">
      <img className="vp-image" src={imageSrc} alt="" />
    </div>
  )
}

function ValueBlockLink({ item }: { item: ValueBlock }) {
  return (
    <a
      href={`#value-${item.id}`}
      data-span={item.span}
      data-animated={item.span === "big"}
      data-value-id={item.id}
      className="vp-block"
      aria-haspopup="dialog"
      aria-label={`${item.title} - open details`}
    >
      <span className="vp-block-glow" aria-hidden="true" />
      <span className="vp-block-icon" aria-hidden="true">
        <ValueIcon Icon={item.Icon} />
      </span>
      <span className="vp-block-text">
        <span className="vp-block-title">{item.title}</span>
        {item.span === "big" ? <span className="vp-block-lead">{item.body}</span> : null}
      </span>
      <span className="vp-block-cue" aria-hidden="true">
        <ArrowUpRight className="size-4" strokeWidth={1.8} />
      </span>
    </a>
  )
}

function ValueModal({
  item,
  persona,
}: {
  item: ValueBlock
  persona: PersonaKey
}) {
  return (
    <div
      id={`value-${item.id}`}
      className="vp-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`vp-modal-title-${item.id}`}
    >
      <a
        href="#value"
        className="vp-modal-backdrop"
        aria-label="Close details"
      />

      <div className="vp-modal-panel">
        <a href="#value" className="vp-close" aria-label="Close details">
          <X className="size-5" strokeWidth={1.8} />
        </a>

        <div className="vp-panel-grid">
          <div className="vp-panel-copy">
            <span className="vp-panel-icon" aria-hidden="true">
              <ValueIcon Icon={item.Icon} />
            </span>
            <h3 id={`vp-modal-title-${item.id}`} className="vp-panel-title">
              {item.title}
            </h3>
            <p className="bsp-body vp-panel-body">{item.body}</p>
          </div>
          <div className="vp-svg-wrap" aria-hidden="true">
            <img
              className="vp-svg"
              src={`/value-cards/${item.svgFile}`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ValueProps({ persona }: { persona: PersonaKey }) {
  return (
    <section
      id="value"
      data-section="value"
      data-persona={persona}
      className="vp-section border-t border-[var(--p-ink-line)]"
    >
      <style>{`
        .vp-section {
          position: relative;
          overflow: hidden;
          padding: clamp(56px, 8vw, 120px) clamp(20px, 5vw, 88px);
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--p-bg) 96%, var(--p-accent)) 0%, var(--p-bg) 58%),
            var(--p-bg);
        }

        .vp-wrap {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        .vp-wrap[data-busy="true"] {
          z-index: 20;
        }

        .vp-head {
          max-width: 720px;
          margin-bottom: clamp(36px, 5vw, 64px);
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .vp-wrap[data-busy="true"] .vp-head {
          opacity: 0.2;
          filter: blur(1px);
          pointer-events: none;
        }

        .vp-stage {
          position: relative;
          width: 100%;
        }

        .vp-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          grid-template-rows: repeat(3, minmax(120px, 1fr));
          grid-auto-flow: row dense;
          gap: 16px;
          height: clamp(520px, 60vw, 600px);
          transition:
            opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }

        .vp-grid[data-dimmed="true"] {
          opacity: 0;
          transform: scale(0.965);
          filter: blur(3px);
          pointer-events: none;
        }

        .vp-block {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          text-align: left;
          text-decoration: none;
          padding: clamp(18px, 2vw, 26px) clamp(18px, 2vw, 26px) clamp(22px, 2.4vw, 30px);
          border: 1px solid color-mix(in srgb, var(--p-ink-line) 88%, var(--p-accent));
          border-radius: 26px;
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--p-surface-warm) 92%, var(--p-accent)) 0%, color-mix(in srgb, var(--p-surface) 84%, var(--p-bg)) 100%);
          color: var(--p-ink);
          cursor: pointer;
          font-family: var(--font-instrument-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          appearance: none;
          box-shadow:
            0 1px 0 color-mix(in srgb, var(--p-ink) 8%, transparent) inset,
            0 22px 40px -34px rgba(0, 0, 0, 0.9);
          transition:
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, box-shadow;
        }

        .vp-block[data-span="big"] {
          grid-column: span 2;
          grid-row: span 2;
          border-radius: 30px;
        }

        .vp-block[data-span="wide"] {
          grid-column: span 2;
          grid-row: span 1;
          padding-bottom: clamp(22px, 2.4vw, 32px);
        }

        .vp-block[data-span="small"] {
          grid-column: span 1;
          grid-row: span 1;
        }

        .vp-block-glow {
          position: absolute;
          inset: -40% 40% 60% -10%;
          background: radial-gradient(circle, color-mix(in srgb, var(--p-accent) 36%, transparent), transparent 68%);
          opacity: 0;
          filter: blur(26px);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .vp-block-icon,
        .vp-panel-icon {
          display: grid;
          place-items: center;
          color: var(--p-accent);
          background: color-mix(in srgb, var(--p-accent) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--p-accent) 30%, transparent);
        }

        .vp-block-icon {
          width: 46px;
          height: 46px;
          min-width: 46px;
          min-height: 46px;
          flex: 0 0 46px;
          aspect-ratio: 1 / 1;
          border-radius: 14px;
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .vp-block[data-span="small"] .vp-block-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          min-height: 42px;
          flex-basis: 42px;
        }

        .vp-block-icon svg,
        .vp-panel-icon svg {
          display: block;
          flex: none;
          aspect-ratio: 1 / 1;
        }

        .vp-block-icon svg,
        .vp-panel-icon svg {
          width: 28px;
          height: 28px;
        }

        .vp-block-text {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .vp-block-title {
          font-size: clamp(16px, 1.55vw, 20px);
          font-weight: 500;
          line-height: 1.16;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        .vp-block-lead {
          max-width: 38ch;
          color: var(--p-ink-mute);
          font-size: clamp(12px, 1.05vw, 14px);
          line-height: 1.28;
          letter-spacing: -0.01em;
        }

        .vp-block-cue {
          position: absolute;
          top: 16px;
          right: 16px;
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: var(--p-accent);
          background: color-mix(in srgb, var(--p-ink) 6%, transparent);
          opacity: 0;
          transform: translate(4px, -4px) scale(0.9);
          transition:
            opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (hover: hover) {
          .vp-block:hover {
            transform: translateY(-7px);
            border-color: color-mix(in srgb, var(--p-accent) 55%, transparent);
            box-shadow:
              0 1px 0 color-mix(in srgb, var(--p-ink) 12%, transparent) inset,
              0 40px 60px -38px rgba(0, 0, 0, 0.95),
              0 0 0 1px color-mix(in srgb, var(--p-accent) 18%, transparent);
            animation-play-state: paused;
          }

          .vp-block:hover .vp-block-glow {
            animation: none;
            opacity: 0.9;
          }

          .vp-block:hover .vp-block-icon {
            transform: translateY(-2px) scale(1.05);
            background: color-mix(in srgb, var(--p-accent) 22%, transparent);
          }

          .vp-block:hover .vp-block-cue {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        .vp-block:focus-visible {
          outline: none;
          border-color: var(--p-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--p-accent) 35%, transparent);
        }

        .vp-block:active {
          transform: translateY(-3px) scale(0.992);
        }

        @media (prefers-reduced-motion: no-preference) {
          .vp-block[data-animated="true"] {
            animation: vp-featured-click 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          }

          .vp-block[data-animated="true"] .vp-block-glow {
            animation: vp-featured-glow 2.4s ease-in-out infinite;
          }

          .vp-block[data-animated="true"] .vp-block-cue {
            animation: vp-cue-pop 2.4s ease-in-out infinite;
            opacity: 1;
          }
        }

        @keyframes vp-featured-click {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow:
              0 1px 0 color-mix(in srgb, var(--p-ink) 8%, transparent) inset,
              0 22px 40px -34px rgba(0, 0, 0, 0.9);
          }
          45% {
            transform: translateY(-9px) scale(1.018);
            border-color: color-mix(in srgb, var(--p-accent) 74%, transparent);
            box-shadow:
              0 1px 0 color-mix(in srgb, var(--p-ink) 14%, transparent) inset,
              0 44px 74px -38px rgba(0, 0, 0, 0.98),
              0 0 0 2px color-mix(in srgb, var(--p-accent) 28%, transparent);
          }
          58% {
            transform: translateY(-4px) scale(1.006);
          }
        }

        @keyframes vp-featured-glow {
          0%, 100% { opacity: 0.08; }
          45% { opacity: 0.75; }
          58% { opacity: 0.28; }
        }

        @keyframes vp-cue-pop {
          0%, 100% { transform: translate(2px, -2px) scale(0.94); }
          45% { transform: translate(0, 0) scale(1.14); }
          58% { transform: translate(1px, -1px) scale(1); }
        }

        .vp-modal {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: grid;
          place-items: center;
          padding: clamp(18px, 4vw, 48px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity 0.22s cubic-bezier(0.22, 1, 0.36, 1),
            visibility 0s linear 0.22s;
        }

        .vp-modal:target {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition:
            opacity 0.22s cubic-bezier(0.22, 1, 0.36, 1),
            visibility 0s;
        }

        .vp-modal-backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          padding: 0;
          cursor: pointer;
          background: color-mix(in srgb, var(--p-bg) 68%, transparent);
          backdrop-filter: blur(12px);
        }

        .vp-modal-panel {
          position: relative;
          z-index: 1;
          width: min(960px, 100%);
          max-height: min(720px, calc(100vh - 40px));
          overflow: auto;
          padding: clamp(24px, 4vw, 56px);
          border-radius: 30px;
          border: 1px solid color-mix(in srgb, var(--p-accent) 26%, var(--p-ink-line));
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--p-surface-warm) 86%, var(--p-accent)) 0%, color-mix(in srgb, var(--p-surface) 78%, var(--p-bg)) 100%);
          box-shadow: 0 60px 120px -50px rgba(0, 0, 0, 0.95);
          opacity: 0;
          transform: translateY(14px) scale(0.985);
          transition:
            opacity 0.24s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .vp-modal:target .vp-modal-panel {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .vp-close {
          position: absolute;
          top: clamp(14px, 2vw, 26px);
          right: clamp(14px, 2vw, 26px);
          z-index: 3;
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid var(--p-ink-line);
          background: color-mix(in srgb, var(--p-ink) 6%, transparent);
          color: var(--p-ink);
          cursor: pointer;
          transition:
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .vp-close:hover {
          transform: rotate(90deg);
          background: color-mix(in srgb, var(--p-accent) 18%, transparent);
          border-color: color-mix(in srgb, var(--p-accent) 50%, transparent);
        }

        .vp-close:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--p-accent) 35%, transparent);
        }

        .vp-panel-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(22px, 3vw, 44px);
          align-items: center;
          min-height: min(460px, calc(100vh - 152px));
        }

        @media (min-width: 52rem) {
          .vp-panel-grid {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          }
        }

        .vp-panel-copy {
          max-width: 46ch;
        }

        .vp-panel-icon {
          width: 56px;
          height: 56px;
          min-width: 56px;
          min-height: 56px;
          aspect-ratio: 1 / 1;
          margin-bottom: 22px;
          border-radius: 16px;
        }

        .vp-panel-title {
          margin: 0;
          color: var(--p-ink);
          font-family: var(--font-instrument-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(28px, 3.6vw, 44px);
          font-style: normal;
          font-weight: 500;
          line-height: 1.04;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .vp-panel-body {
          margin: 18px 0 0;
          color: var(--p-ink-soft);
        }

        .vp-image-wrap {
          position: relative;
          overflow: hidden;
          width: 100%;
          min-height: 200px;
          max-height: 360px;
          aspect-ratio: 4 / 3;
          border: 1px solid color-mix(in srgb, var(--p-accent) 20%, var(--p-ink-line));
          border-radius: 20px;
          background: color-mix(in srgb, var(--p-bg) 72%, var(--p-surface-warm));
        }

        .vp-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vp-svg-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 100%;
          padding: clamp(8px, 1.5vw, 16px);
          margin-top: clamp(30px, 5vw, 55px);
        }

        .vp-svg {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        #value-tokens .vp-svg {
          transform: scale(1.2);
          transform-origin: center;
        }

        #value-grow .vp-svg {
          transform: scale(1.55);
          transform-origin: center;
        }

        /* lara: dark green bg → white lines */
        [data-persona="lara"] .vp-svg {
          filter: invert(1);
          opacity: 0.82;
        }

        /* johann: light grey bg → SVGs are black by default, no filter needed */
        [data-persona="johann"] .vp-svg {
          opacity: 0.72;
        }

        /* bob: very dark bg → white lines */
        [data-persona="bob"] .vp-svg {
          filter: invert(1);
          opacity: 0.82;
        }


        @media (max-width: 44rem) {
          .vp-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-template-rows: none;
            grid-auto-rows: minmax(108px, auto);
            grid-template-areas:
              "invest invest track"
              "invest invest comm"
              "sell sell grow"
              "comty comty grow";
            gap: 10px;
            height: auto;
          }

          .vp-grid .vp-block:nth-child(1) { grid-area: invest; }
          .vp-grid .vp-block:nth-child(2) { grid-area: sell; }
          .vp-grid .vp-block:nth-child(3) { grid-area: track; }
          .vp-grid .vp-block:nth-child(4) { grid-area: comm; }
          .vp-grid .vp-block:nth-child(5) { grid-area: comty; }
          .vp-grid .vp-block:nth-child(6) { grid-area: grow; }

          .vp-block {
            padding: 14px 14px 16px;
            border-radius: 18px;
            gap: 10px;
            min-height: 0;
          }

          .vp-block[data-span="big"] {
            padding: 18px 18px 22px;
            border-radius: 24px;
            gap: 16px;
          }

          .vp-block-icon {
            width: 34px;
            height: 34px;
            min-width: 34px;
            min-height: 34px;
            flex-basis: 34px;
            border-radius: 10px;
          }

          .vp-block-icon svg {
            width: 19px;
            height: 19px;
          }

          .vp-block[data-span="big"] .vp-block-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
            min-height: 46px;
            flex-basis: 46px;
            border-radius: 13px;
          }

          .vp-block[data-span="big"] .vp-block-icon svg {
            width: 26px;
            height: 26px;
          }

          .vp-block-text {
            gap: 5px;
          }

          .vp-block-title {
            font-size: clamp(14px, 3.35vw, 16px);
            line-height: 1.2;
          }

          .vp-block-lead {
            font-size: 11px;
            line-height: 1.24;
            max-width: 34ch;
          }

          .vp-block-cue {
            width: 24px;
            height: 24px;
            top: 9px;
            right: 9px;
          }

          .vp-panel-grid {
            align-items: start;
            overflow: auto;
          }

          .vp-panel-title {
            padding-right: 52px;
          }
        }

        @media (max-width: 24rem) {
          /* Fallback for very small phones: 2-col bento, still varied shapes. */
          .vp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-areas:
              "invest invest"
              "invest invest"
              "sell sell"
              "track comm"
              "comty grow"
              "comty grow";
            grid-auto-rows: minmax(104px, auto);
          }

          .vp-block-title {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="vp-wrap">
        <div className="vp-head">
          <h2 className="bsp-section-title max-w-3xl text-[var(--p-ink)]">Value Proposition</h2>
          <p className="bsp-section-subtitle mt-5 max-w-2xl text-[var(--p-ink-soft)]">
            Six reasons to hold a real stake.
          </p>
        </div>

        <div className="vp-stage">
          <div className="vp-grid">
            {valueBlocks.map((item) => (
              <ValueBlockLink key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {valueBlocks.map((item) => (
        <ValueModal key={item.id} item={item} persona={persona} />
      ))}
    </section>
  )
}
