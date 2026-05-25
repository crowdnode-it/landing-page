import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PersonaLanding } from "@/components/landing/persona-landing"
import { getPersonaTheme, personaKeys, personas, type PersonaKey } from "@/lib/personas"

type PersonaPageProps = {
  params: Promise<{
    persona: string
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
    title: `Parity for ${theme.name}`,
    description: theme.subtitle,
    other: {
      "theme-color": theme.colors.bg,
    },
  }
}

export default async function PersonaPage({ params }: PersonaPageProps) {
  const { persona } = await params
  const theme = personas[persona as PersonaKey]

  if (!theme) {
    notFound()
  }

  return <PersonaLanding theme={theme} />
}
