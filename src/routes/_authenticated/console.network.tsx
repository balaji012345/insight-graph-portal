import { createFileRoute } from "@tanstack/react-router";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const Route = createFileRoute("/_authenticated/console/network")({
  head: () => ({
    meta: [
      { title: "Network Graph | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content:
          "Interactive relationship map of suspects, calls and transactions derived by graph analytics.",
      },
      { property: "og:title", content: "Network Graph | NCRB Criminal Network Analysis System" },
      { property: "og:description", content: "Relationship map for NCRB criminal network analysis." },
    ],
  }),
  component: () => (
    <ModulePlaceholder
      title="Network Graph"
      description="Graph analytics will visualise links between suspects, calls, transactions and locations."
    />
  ),
});
