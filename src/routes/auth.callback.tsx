import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Emblem } from "@/components/auth/emblem";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Completing sign-in | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content: "Secure sign-in completion step for the NCRB AI-Powered Criminal Network Analysis System.",
      },
      { property: "og:title", content: "Completing sign-in | NCRB Criminal Network Analysis System" },
      {
        property: "og:description",
        content: "Finalising the authenticated session for authorised NCRB investigators.",
      },
    ],
  }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your credentials…");

  useEffect(() => {
    let cancelled = false;

    const finish = async () => {
      // Give Supabase a chance to hydrate the session from the redirect payload.
      for (let attempt = 0; attempt < 25; attempt += 1) {
        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        if (data.session) {
          await navigate({ to: "/console", replace: true });
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      if (cancelled) return;
      setMessage("Sign-in could not be completed. Returning to the login page…");
      await navigate({ to: "/", replace: true });
    };

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && !cancelled) void navigate({ to: "/console", replace: true });
    });

    void finish();

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center surface-secure px-4">
      <section className="panel-official w-full max-w-sm rounded-xl px-6 py-9 text-center">
        <Emblem />
        <p className="mt-8 text-sm text-muted-foreground">{message}</p>
      </section>
    </main>
  );
}
