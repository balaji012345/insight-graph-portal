import { createFileRoute } from "@tanstack/react-router";

import { DatabaseModule } from "@/components/dashboard/database-module";

export const Route = createFileRoute("/_authenticated/console/")({
  head: () => ({
    meta: [
      { title: "Database | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content:
          "Search and filter criminal case records by name, FIR number or case ID inside the NCRB network analysis console.",
      },
      { property: "og:title", content: "Database | NCRB Criminal Network Analysis System" },
      {
        property: "og:description",
        content: "Investigator database module for NCRB criminal network analysis.",
      },
    ],
  }),
  component: () => <DatabaseModule />,
});
