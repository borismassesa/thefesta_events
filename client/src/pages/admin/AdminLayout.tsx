import { Link, Route, Switch, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Users, 
  Calendar, 
  Settings, 
  ChevronRight,
  Briefcase,
  Store,
  PenTool,
  Image as ImageIcon,
  ListTodo
} from "lucide-react";

import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import Dashboard from "./Dashboard";

import PageEditor from "./content/PageEditor";

// Admin Layout Component
export function AdminLayout() {
  const [location] = useLocation();

  const MENU_GROUPS = [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      ]
    },
    {
      label: "Content (CMS)",
      items: [
        { label: "Pages", icon: FileText, href: "/admin/content/pages" },
        { label: "Blog & Ideas", icon: PenTool, href: "/admin/content/blog" },
        { label: "Media Library", icon: ImageIcon, href: "/admin/content/media" },
      ]
    },
    {
      label: "Marketplace",
      items: [
        { label: "Vendors", icon: Briefcase, href: "/admin/marketplace/vendors" },
        { label: "Products", icon: ShoppingBag, href: "/admin/marketplace/products" },
        { label: "Orders", icon: Store, href: "/admin/marketplace/orders" },
      ]
    },
    {
      label: "Event Management",
      items: [
        { label: "Bookings", icon: Calendar, href: "/admin/events/bookings" },
        { label: "Planning Tools", icon: ListTodo, href: "/admin/events/tools" },
      ]
    },
    {
      label: "Organization",
      items: [
        { label: "Employees", icon: Users, href: "/admin/org/employees" },
        { label: "Settings", icon: Settings, href: "/admin/org/settings" },
      ]
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background text-foreground">
        <Sidebar className="border-r border-border bg-surface/50">
          <SidebarHeader className="p-4 border-b border-border/50">
            <Link href="/">
              <a className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background font-serif font-bold text-lg">
                   F
                 </div>
                 <span className="font-semibold text-lg tracking-tight">TheFesta Admin</span>
              </a>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {MENU_GROUPS.map((group, index) => (
              <SidebarGroup key={index}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={location === item.href}
                          className="h-9 transition-all hover:translate-x-1"
                        >
                          <Link href={item.href}>
                            <a className="flex items-center gap-3">
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                              {location === item.href && (
                                <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                              )}
                            </a>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto bg-surface/30">
          <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
            <Switch>
               <Route path="/admin" component={Dashboard} />
               <Route path="/admin/content/pages" component={PageEditor} />
               <Route>
                  <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-60">
                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-border">
                       <Settings className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Under Construction</h2>
                    <p className="text-muted-foreground mt-2 max-w-sm">This module is part of the planned ERP system rollout.</p>
                  </div>
               </Route>
            </Switch>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
