import { cn } from "@/lib/utils";

export type PasswordScore = 0 | 1 | 2 | 3 | 4;

export function scorePassword(password: string): PasswordScore {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4) as PasswordScore;
}

const LABELS = ["Too weak", "Weak", "Fair", "Strong", "Very strong"] as const;

export function PasswordStrength({ password }: { password: string }) {
  const score = scorePassword(password);
  const tone =
    score <= 1 ? "bg-destructive" : score === 2 ? "bg-warning" : score === 3 ? "bg-gold" : "bg-success";

  return (
    <div aria-live="polite" className="space-y-1.5">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index < score ? tone : "bg-secondary",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium text-foreground">{LABELS[score]}</span>
        {score < 3 ? " — use 12+ characters with mixed case, a number and a symbol." : ""}
      </p>
    </div>
  );
}
