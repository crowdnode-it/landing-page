// Single source of truth for email validity, shared by BOTH the client form
// (used as the <input> `pattern`) and the server (`validateWaitlist`), so the
// two never disagree. ASCII local part + a dotted domain with a 2+ letter TLD,
// which rejects loose cases like "a@b" and non-ASCII addresses up front.
export const waitlistEmailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

// RFC 5321 caps a full email address at 254 characters.
export const waitlistEmailMaxLength = 254

export const waitlistErrorMessages = {
  email: "Enter a valid email to join the waitlist.",
  role: "Choose the option that best describes you.",
  server: "Something went wrong on our end. Please try again.",
} as const

export type WaitlistErrorCode = keyof typeof waitlistErrorMessages

export function validateWaitlist(email: string, role: string): "email" | "role" | null {
  const trimmedEmail = email.trim()

  if (trimmedEmail.length > waitlistEmailMaxLength || !waitlistEmailPattern.test(trimmedEmail)) {
    return "email"
  }

  if (!role.trim()) {
    return "role"
  }

  return null
}

export function getWaitlistErrorMessage(code: string | null | undefined) {
  if (code === "email" || code === "role" || code === "server") {
    return waitlistErrorMessages[code]
  }

  return ""
}
