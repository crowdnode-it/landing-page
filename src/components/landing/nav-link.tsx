"use client"

export function NavLink({
  href,
  block = "start",
  offset,
  className,
  children,
  ...props
}: {
  href: string
  block?: ScrollLogicalPosition
  offset?: number
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()

    if (offset !== undefined) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    } else if (block === "center") {
      const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + el.offsetHeight / 2
      window.scrollTo({ top, behavior: "smooth" })
    } else {
      el.scrollIntoView({ behavior: "smooth", block })
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
