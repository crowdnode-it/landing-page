export const waitlistEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const waitlistErrorMessages = {
  email: "Enter a valid email to join the waitlist.",
  role: "Choose the option that best describes you.",
} as const

export type WaitlistErrorCode = keyof typeof waitlistErrorMessages

export function validateWaitlist(email: string, role: string): WaitlistErrorCode | null {
  if (!waitlistEmailPattern.test(email.trim())) {
    return "email"
  }

  if (!role.trim()) {
    return "role"
  }

  return null
}

export function getWaitlistErrorMessage(code: string | null | undefined) {
  if (code === "email" || code === "role") {
    return waitlistErrorMessages[code]
  }

  return ""
}
