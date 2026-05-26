import type { ReactNode } from "react"

export function NavWrapper({ children }: { children: ReactNode }) {
  return (
    <div id="main-nav" className="fixed top-0 left-0 right-0 z-50" style={{ transition: "background-color 0.3s, backdrop-filter 0.3s" }}>
      {children}
    </div>
  )
}
