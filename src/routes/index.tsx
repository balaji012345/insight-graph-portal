import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Emblem } from "@/components/auth/emblem";
import { LoginForm } from "@/components/auth/login-form";
import { RecoveryDialog, type RecoveryMode } from "@/components/auth/recovery-dialogs";
import { SignupForm } from "@/components/auth/signup-form";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secure Login | AI Criminal Network Analysis System — NCRB" },
      {
        name: "description",
        content:
          "Restricted access portal for the NCRB AI-Powered Criminal Network Analysis System. Authorised investigators sign in to analyse criminal networks.",
      },
      { property: "og:title", content: "Secure Login | AI Criminal Network Analysis System — NCRB" },
      {
        property: "og:description",
        content:
          "Restricted access portal for the NCRB AI-Powered Criminal Network Analysis System. Authorised personnel only.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [view, setView] = useState<"login" | "signup">("login");
  const [recovery, setRecovery] = useState<RecoveryMode>(null);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden surface-secure px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-secure" />

      <div className="relative w-full max-w-md">
        <section className="panel-official rounded-xl px-6 py-8 sm:px-9 sm:py-10">
          <Emblem />

          <div className="mt-8" role="tablist" aria-label="Authentication mode">
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary/50 p-1">
              {(["login", "signup"] as const).map((mode) => (
                <button
                  key={mode}
                  role="tab"
                  aria-selected={view === mode}
                  type="button"
                  onClick={() => setView(mode)}
                  className={cn(
                    "rounded-md py-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                    view === mode
                      ? "bg-gold text-gold-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {mode === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>
          </div>

          <div key={view} className="mt-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {view === "login" ? (
              <LoginForm
                onForgotUsername={() => setRecovery("username")}
                onForgotPassword={() => setRecovery("password")}
                onSwitchToSignup={() => setView("signup")}
              />
            ) : (
              <SignupForm onSwitchToLogin={() => setView("login")} />
            )}
          </div>
        </section>

        <div className="mt-6 space-y-2 text-center">
          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-gold" />
            Restricted system. Access is monitored and audit-logged.
          </p>
          <p className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground/80">
            <ShieldCheck className="h-3.5 w-3.5" />
            Authorised law-enforcement personnel only
          </p>
        </div>
      </div>

      <RecoveryDialog mode={recovery} onClose={() => setRecovery(null)} />
    </main>
  );
}
