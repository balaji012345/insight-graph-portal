import { Database, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

/** Core feature modules. Only "Database" is implemented for now. */
export function ModuleTabs() {
  const placeholders = ["Feature 2", "Feature 3"];

  return (
    <nav aria-label="Core feature modules" className="flex flex-wrap items-center gap-2">
      <span
        aria-current="page"
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-gold/60 bg-gold/15 px-3 py-1.5",
          "text-xs font-semibold uppercase tracking-wider text-gold",
        )}
      >
        <Database className="h-4 w-4" />
        Database
      </span>
      {placeholders.map((label) => (
        <span
          key={label}
          aria-disabled="true"
          title="Module coming soon"
          className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-border bg-secondary/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
        >
          <Lock className="h-3.5 w-3.5" />
          {label}
        </span>
      ))}
    </nav>
  );
}
