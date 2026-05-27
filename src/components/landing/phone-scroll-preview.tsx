import type { PersonaTheme } from "@/lib/personas"

export function PhoneScrollPreview({ theme }: { theme: PersonaTheme }) {
  const vars = {
    "--text": theme.colors.ink,
    "--background": theme.colors.bg,
    "--primary": theme.colors.surface,
    "--secondary": theme.colors.surfaceWarm,
    "--accent": theme.colors.accent,
    "--muted": theme.colors.inkMute,
    "--line": theme.colors.inkLine,
  } as React.CSSProperties

  const ff: React.CSSProperties = { fontFeatureSettings: '"cv11", "ss01", "ss03"' }

  return (
    <div style={{ ...vars, ...ff, WebkitFontSmoothing: "antialiased" }} className="flex items-center justify-center font-sans">
      {/* Phone bezel */}
      <div
        style={{
          position: "relative",
          width: 390,
          height: 820,
          borderRadius: 58,
          padding: 10,
          background: "linear-gradient(145deg, #1c1d20, #050608 48%, #26272a)",
          boxShadow: "0 30px 74px -34px rgba(0,0,0,0.52), 0 14px 34px -20px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.16), inset 0 0 0 3px rgba(0,0,0,0.70)",
        }}
      >
        {/* Left buttons */}
        <div style={{ content: "", position: "absolute", width: 4, left: -3, top: 128, height: 50, borderRadius: 5, background: "linear-gradient(180deg, #36383b, #111215)" }} />
        <div style={{ content: "", position: "absolute", width: 4, left: -3, top: 198, height: 50, borderRadius: 5, background: "linear-gradient(180deg, #36383b, #111215)" }} />
        <div style={{ content: "", position: "absolute", width: 4, left: -3, top: 268, height: 50, borderRadius: 5, background: "linear-gradient(180deg, #36383b, #111215)" }} />
        {/* Right button */}
        <div style={{ content: "", position: "absolute", width: 4, right: -3, top: 220, height: 88, borderRadius: 5, background: "linear-gradient(180deg, #36383b, #111215)" }} />

        {/* Screen */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: 49,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.10)",
            background: `radial-gradient(540px 380px at 92% -10%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 60%), radial-gradient(420px 320px at -10% 100%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%), var(--background)`,
            color: "var(--text)",
          }}
        >
          {/* Status bar */}
          <div
            style={{
              position: "absolute", inset: "0 0 auto", height: 54, zIndex: 30,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 34px 0 35px",
              fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em",
              pointerEvents: "none",
            }}
          >
            <span>9:41</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="1" y="7" width="3" height="4" rx="0.7" fill="currentColor" /><rect x="5.7" y="5" width="3" height="6" rx="0.7" fill="currentColor" /><rect x="10.4" y="3" width="3" height="8" rx="0.7" fill="currentColor" /><rect x="15.1" y="1" width="3" height="10" rx="0.7" fill="currentColor" /></svg>
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><path d="M8.5 10.4l1.15-1.18a1.62 1.62 0 0 0-2.3 0L8.5 10.4zm-4-4.05 1.18 1.17a4 4 0 0 1 5.64 0l1.18-1.17a5.66 5.66 0 0 0-8 0zm-2.55-2.6 1.17 1.18a7.62 7.62 0 0 1 10.76 0l1.17-1.18a9.28 9.28 0 0 0-13.1 0z" fill="currentColor" /></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".8" y="1.3" width="20.7" height="9.4" rx="2.6" stroke="currentColor" strokeWidth="1.3" /><rect x="3" y="3.2" width="16.1" height="5.6" rx="1.4" fill="currentColor" /><rect x="22.2" y="4" width="1.7" height="4" rx=".8" fill="currentColor" /></svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute", zIndex: 35, top: 14, left: "50%",
              width: 112, height: 36, transform: "translateX(-50%)",
              borderRadius: 999, background: "#000", pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute", right: 16, top: 12,
                width: 12, height: 12, borderRadius: "50%",
                background: "radial-gradient(circle at 54% 46%, rgba(64,94,255,0.88) 0 18%, rgba(31,41,115,0.72) 30%, rgba(4,5,8,0.95) 66%)",
              }}
            />
          </div>

          {/* Header row */}
          <header
            style={{
              position: "absolute", zIndex: 36, top: 64, left: 28, right: 28,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontSize: 24, lineHeight: 1, fontWeight: 800, letterSpacing: "-0.06em", color: "var(--text)" }}>
              Parity<span style={{ color: "var(--accent)", textShadow: "0 0 14px color-mix(in oklab, var(--accent) 60%, transparent)" }}>.</span>
            </h1>
            <div
              style={{
                width: 32, height: 32, borderRadius: "50%",
                display: "grid", placeItems: "center",
                fontSize: 13, fontWeight: 700, letterSpacing: "-0.03em",
                background: `linear-gradient(145deg, var(--secondary), var(--primary))`,
                color: "var(--accent)",
                border: "1px solid var(--line)",
              }}
            >
              {theme.name.charAt(0)}
            </div>
          </header>

          {/* Card frame */}
          <div style={{ position: "absolute", zIndex: 5, top: 108, left: 18, right: 18, bottom: 96, display: "flex" }}>
            <article
              style={{
                flex: "1 1 auto", minHeight: 0, borderRadius: 22,
                padding: "22px 22px 18px", overflow: "hidden",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative",
                background: "linear-gradient(180deg, var(--primary) 0%, var(--background) 65%)",
                color: "var(--text)",
                border: "1px solid var(--line)",
                boxShadow: "0 24px 60px -36px color-mix(in oklab, var(--accent) 28%, transparent), inset 0 1px 0 color-mix(in oklab, var(--text) 4%, transparent)",
              }}
            >
              {/* Card radial overlay */}
              <div style={{ content: "", position: "absolute", inset: 0, background: "radial-gradient(240px 180px at 90% 4%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

              <div style={{ position: "relative", zIndex: 2 }}>
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
                    Climate
                  </span>
                  <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, padding: "5px 10px 4px", borderRadius: 999, border: "1px solid currentColor", lineHeight: 1, color: "var(--accent)", background: "color-mix(in oklab, var(--accent) 8%, transparent)" }}>
                    Series A
                  </span>
                </div>

                {/* Headline */}
                <h2 style={{ fontSize: 28, lineHeight: 1, letterSpacing: "-0.05em", fontWeight: 800, color: "var(--text)" }}>
                  Wind farms, <span style={{ color: "var(--accent)" }}>owned by the people</span> who power them.
                </h2>

                {/* Description */}
                <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.5, letterSpacing: "-0.005em", fontWeight: 400, color: "var(--muted)" }}>
                  Tessera puts operating renewable infrastructure on a regulated rail. A real asset class for the savers who were locked out of the index funds that already own it.
                </p>

                {/* Quote */}
                <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: "0 12px 12px 0", background: "color-mix(in oklab, var(--accent) 7%, transparent)", borderLeft: "2px solid var(--accent)" }}>
                  <p style={{ fontSize: 13.5, lineHeight: 1.45, letterSpacing: "-0.01em", fontWeight: 600, color: "var(--text)" }}>
                    The grid was built by public money. The next one, by the public itself.
                  </p>
                  <div style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "var(--muted)" }}>
                    Léa K. · Founder, ex Engie
                  </div>
                </div>
              </div>

              {/* Spacer */}
              <div style={{ flex: "1 1 auto", minHeight: 0 }} />

              <div style={{ position: "relative", zIndex: 2 }}>
                {/* Metrics */}
                <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                  {[
                    { label: "Ticket", value: "€200" },
                    { label: "Raising", value: "€600K" },
                    { label: "Closes", value: "06d" },
                  ].map((m, i) => (
                    <div key={m.label} style={{ padding: "12px 12px 10px", borderRight: i < 2 ? "1px solid var(--line)" : "none" }}>
                      <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "var(--muted)" }}>{m.label}</div>
                      <div style={{ marginTop: 6, fontSize: 20, letterSpacing: "-0.035em", fontWeight: 800, fontVariantNumeric: "tabular-nums", lineHeight: 1, color: "var(--accent)" }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <div style={{ marginTop: 14, display: "grid", gap: 9 }}>
                  {[
                    { strong: "Problem.", text: " Wind capacity sits in a few institutional funds. Retail savers are priced out." },
                    { strong: "Solution.", text: " Tessera fractionalizes operating farms into €200 tickets under EU MiCA." },
                  ].map((row) => (
                    <div key={row.strong} style={{ display: "grid", gridTemplateColumns: "14px 1fr", alignItems: "start", gap: 10, fontSize: 12, lineHeight: 1.42, letterSpacing: "-0.005em", fontWeight: 400, color: "var(--muted)" }}>
                      <span style={{ width: 8, height: 8, marginTop: 5, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", display: "inline-block" }} />
                      <span><b style={{ fontWeight: 700, color: "var(--text)" }}>{row.strong}</b>{row.text}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ marginTop: 14, paddingBottom: 4, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 800, letterSpacing: "-0.03em", background: "var(--secondary)", color: "var(--accent)", border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)", boxShadow: "0 0 14px color-mix(in oklab, var(--accent) 25%, transparent)" }}>
                    t
                  </div>
                  <div>
                    <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1, color: "var(--muted)" }}>
                      <b style={{ display: "block", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", textTransform: "none", marginTop: 0, color: "var(--text)" }}>Tessera</b>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)", lineHeight: 1 }}>
                        <svg style={{ width: 12, height: 12, color: "var(--accent)", flex: "0 0 auto" }} viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" fill="currentColor" /><path d="m6.8 11.4 2.8 2.8 5.6-6" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Verified startup
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Tab bar */}
          <nav
            style={{
              position: "absolute", zIndex: 28, left: 10, right: 10, bottom: 18,
              height: 72, padding: "8px 9px 10px",
              display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              borderRadius: 28,
              background: "color-mix(in oklab, var(--background) 92%, transparent)",
              border: "1px solid var(--line)",
              backdropFilter: "blur(20px)",
            }}
          >
            {[
              { label: "Home", active: true, d: "M2 10 12 2l10 8v10a1 1 0 0 1-1 1h-5v-6H8v6H3a1 1 0 0 1-1-1z" },
              { label: "Explore", active: false, d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0m4 6-2 6-6 2 2-6z" },
              { label: "Portfolio", active: false, d: "M2 6h20v16H2zM16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
              { label: "Market", active: false, d: "M2 18 9 11l4 4 9-11M15 4h7v7" },
              { label: "Community", active: false, d: "M8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 22c0-3.5 2.5-5.5 6-5.5h8c3.5 0 6 2 6 5.5" },
            ].map((tab) => (
              <a
                key={tab.label}
                style={{
                  minWidth: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 4,
                  fontSize: 9, lineHeight: 1, fontWeight: 600, letterSpacing: "0.02em",
                  textDecoration: "none",
                  color: tab.active ? "var(--accent)" : "var(--muted)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={tab.d} /></svg>
                <span>{tab.label}</span>
              </a>
            ))}
          </nav>

          {/* Home indicator */}
          <div style={{ position: "absolute", zIndex: 40, left: "50%", bottom: 7, width: 112, height: 5, transform: "translateX(-50%)", borderRadius: 999, background: "#050506", pointerEvents: "none" }} />
        </div>
      </div>
    </div>
  )
}
