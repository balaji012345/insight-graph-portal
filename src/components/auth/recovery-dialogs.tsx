import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { requestUsernameReminder } from "@/lib/auth.functions";
import { isValidEmail } from "@/lib/validation";

type RecoveryMode = "password" | "username" | null;

const COPY = {
  password: {
    title: "Reset your password",
    description:
      "Enter the email registered with your NCRB account. We will send a secure link to set a new password.",
    action: "Send reset link",
  },
  username: {
    title: "Recover your username",
    description:
      "Enter the email registered with your NCRB account. We will send a reminder with your assigned username.",
    action: "Send username reminder",
  },
} as const;

export function RecoveryDialog({ mode, onClose }: { mode: RecoveryMode; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const open = mode !== null;
  const copy = mode ? COPY[mode] : COPY.password;

  const close = () => {
    setEmail("");
    setError("");
    onClose();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      if (mode === "password") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (resetError) throw resetError;
      } else {
        await requestUsernameReminder({ data: { email: email.trim() } });
      }
      toast.success("Request received", {
        description: `If an account exists for ${email.trim()}, instructions are on their way.`,
      });
      close();
    } catch {
      toast.error("Request could not be completed", { description: "Please try again shortly." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? null : close())}>
      <DialogContent className="panel-official sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label
              htmlFor="recovery-email"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Registered email
            </Label>
            <Input
              id="recovery-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="officer@ncrb.gov.in"
              autoComplete="email"
              aria-invalid={Boolean(error)}
              required
            />
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : copy.action}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type { RecoveryMode };
