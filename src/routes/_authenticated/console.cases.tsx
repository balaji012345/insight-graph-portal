import { createFileRoute } from "@tanstack/react-router";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const Route = createFileRoute("/_authenticated/console/cases")({
  head: () => ({
    meta: [
      { title: "Case Management | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content: "Assign, track and update criminal investigation cases in the NCRB analysis console.",
      },
      { property: "og:title", content: "Case Management | NCRB Criminal Network Analysis System" },
      { property: "og:description", content: "Case management workspace for NCRB investigators." },
    ],
  }),
  component: () => (
    <ModulePlaceholder
      title="Case Management"
      description="Assignment, escalation and status tracking for registered cases will be available here."
    />
  ),
});
