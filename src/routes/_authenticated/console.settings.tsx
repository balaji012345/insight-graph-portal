import { createFileRoute } from "@tanstack/react-router";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const Route = createFileRoute("/_authenticated/console/settings")({
  head: () => ({
    meta: [
      { title: "Settings | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content: "Manage officer profile, posting details and console preferences.",
      },
      { property: "og:title", content: "Settings | NCRB Criminal Network Analysis System" },
      { property: "og:description", content: "Officer profile and console settings for NCRB." },
    ],
  }),
  component: () => (
    <ModulePlaceholder
      title="Settings"
      description="Officer profile editing, posting details and console preferences will be managed here."
    />
  ),
});
