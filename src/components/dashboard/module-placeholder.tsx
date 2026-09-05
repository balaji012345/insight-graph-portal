import { Construction } from "lucide-react";

export function ModulePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-bold uppercase tracking-wide sm:text-2xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <div className="panel-official flex flex-col items-center gap-3 rounded-lg px-4 py-14 text-center">
        <Construction className="h-8 w-8 text-gold" />
        <p className="text-sm text-muted-foreground">
          This module is planned for a later phase of the platform.
        </p>
      </div>
    </section>
  );
}
