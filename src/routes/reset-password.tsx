import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Emblem } from "@/components/auth/emblem";
import { PasswordField } from "@/components/auth/password-field";
import { PasswordStrength, scorePassword } from "@/components/auth/password-strength";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set New Password | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content:
          "Set a new password for your NCRB AI-Powered Criminal Network Analysis System investigator account.",
      },
      { property: "og:title", content: "Set New Password | NCRB Criminal Network Analysis System" },
      {
        property: "og:description",
        content: "Secure password reset for authorised NCRB investigators.",
      },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (scorePassword(password) < 3) {
      setError("Choose a stronger password.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (updateError) {
      toast.error("Password not updated", { description: updateError.message });
      return;
    }
    toast.success("Password updated", { description: "You can now sign in with your new password." });
    await navigate({ to: "/" });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden surface-secure px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-secure" />
      <section className="panel-official relative w-full max-w-md rounded-xl px-6 py-8 sm:px-9 sm:py-10">
        <Emblem />
        <h2 className="mt-8 text-center text-lg font-semibold">Set a new password</h2>
        <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
          <div className="space-y-2">
            <PasswordField
              id="new-password"
              label="New Password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
            />
            <PasswordStrength password={password} />
          </div>
          <PasswordField
            id="confirm-new-password"
            label="Confirm New Password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            error={error}
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Updating…" : "Update Password"}
          </Button>
        </form>
      </section>
    </main>
  );
}
