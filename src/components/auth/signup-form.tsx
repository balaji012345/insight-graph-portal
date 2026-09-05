import { useState } from "react";
import { toast } from "sonner";

import { GoogleButton } from "@/components/auth/google-button";
import { Divider } from "@/components/auth/login-form";
import { PasswordField } from "@/components/auth/password-field";
import { PasswordStrength, scorePassword } from "@/components/auth/password-strength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail, isValidUsername } from "@/lib/validation";

type Errors = Partial<Record<"fullName" | "username" | "email" | "password" | "confirm", string>>;

export function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const validate = (): Errors => {
    const next: Errors = {};
    if (fullName.trim().length < 3) next.fullName = "Enter your full official name.";
    if (!isValidUsername(username)) next.username = "4-32 characters: letters, numbers, . _ - only.";
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (scorePassword(password) < 3) next.password = "Choose a stronger password.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    return next;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName.trim(), username: username.trim() },
        },
      });
      if (error) {
        toast.error("Registration failed", { description: error.message });
        return;
      }
      if (!data.session) {
        setPendingEmail(email.trim());
        return;
      }
      toast.success("Account created", { description: "You are now signed in." });
      window.location.assign("/console");
    } catch {
      toast.error("Registration unavailable", { description: "Please try again shortly." });
    } finally {
      setSubmitting(false);
    }
  };

  if (pendingEmail) {
    return (
      <div className="space-y-5 text-center">
        <h2 className="text-lg font-semibold">Verify your email</h2>
        <p className="text-sm text-muted-foreground">
          A confirmation link was sent to <span className="text-foreground">{pendingEmail}</span>. Confirm it
          to activate your investigator account, then return here to log in.
        </p>
        <Button type="button" variant="outline" className="w-full" onClick={onSwitchToLogin}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <Field
        id="signup-name"
        label="Full Name"
        value={fullName}
        onChange={setFullName}
        placeholder="Insp. A. Sharma"
        autoComplete="name"
        error={errors.fullName}
      />
      <Field
        id="signup-username"
        label="Username"
        value={username}
        onChange={setUsername}
        placeholder="a.sharma"
        autoComplete="username"
        error={errors.username}
      />
      <Field
        id="signup-email"
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="officer@ncrb.gov.in"
        autoComplete="email"
        type="email"
        error={errors.email}
      />

      <div className="space-y-2">
        <PasswordField
          id="signup-password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          error={errors.password}
        />
        <PasswordStrength password={password} />
      </div>

      <PasswordField
        id="signup-confirm"
        label="Confirm Password"
        value={confirm}
        onChange={setConfirm}
        autoComplete="new-password"
        error={errors.confirm}
      />

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting…" : "Sign Up"}
      </Button>

      <Divider />
      <GoogleButton label="Sign Up with Google" />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-gold underline-offset-4 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        required
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
