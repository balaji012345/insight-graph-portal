import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Network,
  Settings,
  UserCog,
} from "lucide-react";

import shield from "@/assets/ncrb-shield.png";
import { officerPosting } from "@/components/dashboard/officer-profile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { initials } from "@/data/case-records";

const navItems = [
  { title: "Dashboard", url: "/console", icon: LayoutDashboard },
  { title: "Case Management", url: "/console/cases", icon: FolderKanban },
  { title: "Network Graph", url: "/console/network", icon: Network },
  { title: "Reports & Analytics", url: "/console/reports", icon: BarChart3 },
  { title: "Settings", url: "/console/settings", icon: Settings },
] as const;

export function AppSidebar({ email }: { email: string | undefined }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const signOut = async () => {
    await supabase.auth.signOut();
    await navigate({ to: "/" });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3">
        <div className="flex items-center gap-2 px-1 py-1">
          <img src={shield} alt="NCRB departmental shield" className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-wider text-gold">NCRB</p>
              <p className="truncate text-[11px] text-muted-foreground">Network Analysis</p>
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Officer profile"
              className="flex w-full items-center gap-2 rounded-md border border-border bg-secondary/40 p-2 text-left transition-colors hover:bg-secondary"
            >
              <Avatar className="h-8 w-8 shrink-0 ring-1 ring-gold/50">
                <AvatarFallback className="bg-gold/15 text-xs font-semibold text-gold">
                  {initials(email?.split("@")[0]?.replace(/[._-]/g, " ") ?? "Officer")}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium">{email ?? "Investigator"}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {officerPosting.district}
                    </span>
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-64">
            <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-gold">
              Posting details
            </DropdownMenuLabel>
            <div className="space-y-1.5 px-2 pb-2 text-xs">
              {[
                ["Police Station", officerPosting.policeStation],
                ["Area", officerPosting.area],
                ["District", officerPosting.district],
                ["State", officerPosting.state],
                ["Country", officerPosting.country],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-right font-medium">{value}</span>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/console/settings">
                <UserCog className="h-4 w-4" />
                Edit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => void signOut()}>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={
                      item.url === "/console" ? pathname === "/console" : pathname.startsWith(item.url)
                    }
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <p className="px-2 pb-1 text-[10px] leading-snug text-muted-foreground">
            Restricted system. All activity is audit-logged.
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
