import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL ?? "")

/**
 * Insert a waitlist signup. Returns true if a new row was created,
 * false if the email was already on the list (duplicate).
 */
export async function saveWaitlistLead(email: string, role: string, persona: string) {
  const rows = await sql`
    INSERT INTO waitlist (email, role, persona)
    VALUES (${email}, ${role}, ${persona})
    ON CONFLICT (lower(email)) DO NOTHING
    RETURNING id
  `
  return rows.length > 0
}
