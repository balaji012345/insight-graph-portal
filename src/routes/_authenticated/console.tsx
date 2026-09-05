import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Network } from "lucide-react";

import { Emblem } from "@/components/auth/emblem";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/console")({
  head: () => ({
    meta: [
      { title: "Investigator Console | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content:
          "Authenticated investigator console for the NCRB AI-Powered Criminal Network Analysis System.",
      },
      { property: "og:title", content: "Investigator Console | NCRB Criminal Network Analysis System" },
      {
        property: "og:description",
        content: "Authenticated workspace for NCRB criminal network analysis.",
      },
    ],
  }),
  component: Console,
});

function Console() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();

  const signOut = async () => {
    await supabase.auth.signOut();
    await navigate({ to: "/" });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden surface-secure px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-secure" />
      <section className="panel-official relative w-full max-w-lg rounded-xl px-6 py-8 text-center sm:px-9 sm:py-10">
        <Emblem />
        <div className="mt-8 flex items-center justify-center gap-2 text-gold">
          <Network className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Access granted</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Signed in as <span className="text-foreground">{user?.email}</span>. The network analysis workspace
          will be connected here.
        </p>
        <Button type="button" variant="outline" className="mt-7" onClick={signOut}>
          Sign out
        </Button>
      </section>
    </main>
  );
}
