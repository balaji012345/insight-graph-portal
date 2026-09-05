import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = "current-password",
  placeholder = "••••••••",
  error,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={cn("pr-11", error && "border-destructive")}
          required
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-md"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
