import { NextResponse } from "next/server"

import { personaKeys, type PersonaKey } from "@/lib/personas"
import { validateWaitlist } from "@/lib/waitlist"

function isPersonaKey(value: string): value is PersonaKey {
  return (personaKeys as readonly string[]).includes(value)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const personaValue = String(formData.get("persona") ?? "lara")
  const safePersona = isPersonaKey(personaValue) ? personaValue : "lara"
  const email = String(formData.get("email") ?? "").trim()
  const role = String(formData.get("role") ?? "")
  const validationError = validateWaitlist(email, role)
  const redirectUrl = new URL(`/${safePersona}`, request.url)

  if (validationError) {
    redirectUrl.searchParams.set("waitlistError", validationError)
  } else {
    redirectUrl.searchParams.set("joined", "1")
  }

  return NextResponse.redirect(redirectUrl, 303)
}
