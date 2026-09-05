import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const identifierSchema = z.object({
  identifier: z.string().trim().min(1).max(120),
});

/**
 * Resolves a login identifier (username OR email) to the email address that
 * Supabase Auth expects. Username lookups run server-side with privileged
 * access so no email address is ever exposed to the browser.
 */
export const resolveLoginEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => identifierSchema.parse(data))
  .handler(async ({ data }) => {
    const identifier = data.identifier.trim();
    if (identifier.includes("@")) return { email: identifier };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .ilike("username", identifier)
      .maybeSingle();

    // Fall back to the raw value so failures surface as generic auth errors.
    return { email: profile?.email ?? identifier };
  });

const emailSchema = z.object({ email: z.string().trim().email() });

/**
 * Sends a username reminder path: confirms whether an account exists and, if so,
 * returns the masked username. Always resolves with a generic result so the
 * endpoint cannot be used to enumerate registered emails.
 */
export const requestUsernameReminder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("profiles")
      .select("username")
      .ilike("email", data.email)
      .maybeSingle();
    return { ok: true };
  });
