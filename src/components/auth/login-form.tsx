import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { GoogleButton } from "@/components/auth/google-button";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { resolveLoginEmail } from "@/lib/auth.functions";

type LoginFormProps = {
  onForgotUsername: () => void;
  onForgotPassword: () => void;
  onSwitchToSignup: () => void;
};

export function LoginForm({ onForgotUsername, onForgotPassword, onSwitchToSignup }: LoginFormProps) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!identifier.trim()) nextErrors.identifier = "Username or email is required.";
    if (!password) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { email } = await resolveLoginEmail({ data: { identifier: identifier.trim() } });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const message = /confirm/i.test(error.message)
          ? "This account is not confirmed yet. Please confirm your email and retry."
          : "Invalid username or password. Please verify your credentials and retry.";
        setFormError(message);
        return;
      }
      if (!data.session) {
        setFormError("Sign-in could not be completed. Please try again.");
        return;
      }
      toast.success("Authentication successful");
      await navigate({ to: "/console", replace: true });
    } catch {
      setFormError("Sign-in service is unavailable right now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label
          htmlFor="login-identifier"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Username
        </Label>
        <Input
          id="login-identifier"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="Official username or email"
          autoComplete="username"
          aria-invalid={Boolean(errors.identifier)}
          required
        />
        {errors.identifier ? <p className="text-xs text-destructive">{errors.identifier}</p> : null}
      </div>

      <PasswordField
        id="login-password"
        label="Password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={onForgotUsername}
          className="text-muted-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
        >
          Forgot Username?
        </button>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-muted-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {formError ? (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {formError}
        </p>
      ) : null}


      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Verifying…" : "Login"}
      </Button>

      <Divider />
      <GoogleButton label="Login with Google" />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-semibold text-gold underline-offset-4 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground">OR</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
