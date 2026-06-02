import type { ReactNode } from "react"

export function NavWrapper({
  children,
  background,
  border,
}: {
  children: ReactNode
  background: string
  border: string
}) {
  return (
    <div
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: background,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottomColor: border,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      }}
    >
      {children}
    </div>
  )
}
