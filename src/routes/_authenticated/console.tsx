import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ModuleTabs } from "@/components/dashboard/module-tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated/console")({
  component: ConsoleLayout,
});

function ConsoleLayout() {
  const { user } = Route.useRouteContext();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full surface-secure">
        <AppSidebar email={user?.email} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-border bg-background/80 px-3 py-3 backdrop-blur sm:px-5">
            <SidebarTrigger aria-label="Toggle sidebar" />
            <ModuleTabs />
          </header>

          <main className="min-w-0 flex-1 px-3 py-5 sm:px-5 sm:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
