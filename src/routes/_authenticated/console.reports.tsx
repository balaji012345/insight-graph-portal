import { createFileRoute } from "@tanstack/react-router";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const Route = createFileRoute("/_authenticated/console/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content: "Crime trend dashboards and exportable investigation reports for NCRB officers.",
      },
      { property: "og:title", content: "Reports & Analytics | NCRB Criminal Network Analysis System" },
      { property: "og:description", content: "Analytics and reporting for NCRB investigations." },
    ],
  }),
  component: () => (
    <ModulePlaceholder
      title="Reports & Analytics"
      description="Crime trend dashboards and exportable investigation reports will be published here."
    />
  ),
});
