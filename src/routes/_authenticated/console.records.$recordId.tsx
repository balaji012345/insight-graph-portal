import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASE_STATUS_LABEL, caseDurationLabel, caseRecords, initials } from "@/data/case-records";

export const Route = createFileRoute("/_authenticated/console/records/$recordId")({
  head: () => ({
    meta: [
      { title: "Case Record | NCRB Criminal Network Analysis System" },
      {
        name: "description",
        content: "Detailed criminal case record view within the NCRB network analysis console.",
      },
      { property: "og:title", content: "Case Record | NCRB Criminal Network Analysis System" },
      {
        property: "og:description",
        content: "Detailed criminal case record view for NCRB investigators.",
      },
    ],
  }),
  component: RecordDetail,
});

function RecordDetail() {
  const { recordId } = Route.useParams();
  const record = caseRecords.find((r) => r.id === recordId);

  return (
    <section className="space-y-5">
      <Button asChild variant="ghost" size="sm">
        <Link to="/console">
          <ArrowLeft className="h-4 w-4" />
          Back to Database
        </Link>
      </Button>

      {!record ? (
        <div className="panel-official rounded-lg px-4 py-10 text-center text-sm text-muted-foreground">
          Record not found.
        </div>
      ) : (
        <div className="panel-official space-y-5 rounded-lg px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-1 ring-gold/40">
              <AvatarFallback className="bg-secondary text-base font-semibold text-gold">
                {initials(record.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold sm:text-xl">{record.full_name}</h1>
              <p className="font-mono text-xs text-gold">{record.fir_number}</p>
            </div>
            <Badge variant="outline" className="ml-auto text-[10px] uppercase tracking-wider">
              {CASE_STATUS_LABEL[record.status]}
            </Badge>
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            {[
              ["Case duration", caseDurationLabel(record)],
              ["Crime type", record.crime_type],
              ["FIR registered", record.opened_on],
              ["Jurisdiction", `${record.district}, ${record.state}`],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            Full network graph, linked entities and AI-derived relationships will appear here once the
            analysis engine is connected.
          </p>
        </div>
      )}
    </section>
  );
}
