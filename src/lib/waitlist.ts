export const waitlistEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const waitlistErrorMessages = {
  email: "Enter a valid email to join the waitlist.",
  role: "Choose the option that best describes you.",
  server: "Something went wrong on our end. Please try again.",
} as const

export type WaitlistErrorCode = keyof typeof waitlistErrorMessages

export function validateWaitlist(email: string, role: string): "email" | "role" | null {
  if (!waitlistEmailPattern.test(email.trim())) {
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
