import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PersonaLanding } from "@/components/landing/persona-landing"
import { getPersonaTheme, personaKeys, personas, type PersonaKey } from "@/lib/personas"

type PersonaPageProps = {
  params: Promise<{
    persona: string
  }>
  searchParams?: Promise<{
    joined?: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return personaKeys.map((persona) => ({ persona }))
}

export async function generateMetadata({ params }: PersonaPageProps): Promise<Metadata> {
  const { persona } = await params
  const theme = getPersonaTheme(persona)

  if (!theme) {
    return {
      title: "Parity",
    }
  }

  return {
    title: "Parity",
    description: theme.subtitle,
    other: {
      "theme-color": theme.colors.bg,
    },
  }
}

export default async function PersonaPage({ params, searchParams }: PersonaPageProps) {
  const { persona } = await params
  const query = searchParams ? await searchParams : {}
  const theme = personas[persona as PersonaKey]

  if (!theme) {
    notFound()
  }

  return (
    <PersonaLanding
      theme={theme}
      initialWaitlistSubmitted={query.joined === "1"}
    />
  )
}
