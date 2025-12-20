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
  ListTodo,
  Menu
} from "lucide-react";
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import Dashboard from "./Dashboard";
import PageEditor from "./content/PageEditor";

// Admin Layout Component
export function AdminLayout() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const MENU_GROUPS = [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      ]
    },
    {
      label: "Content",
      items: [
        { label: "Pages", icon: FileText, href: "/admin/content/pages" },
        { label: "Blog", icon: PenTool, href: "/admin/content/blog" },
        { label: "Media", icon: ImageIcon, href: "/admin/content/media" },
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
      label: "Events",
      items: [
        { label: "Bookings", icon: Calendar, href: "/admin/events/bookings" },
        { label: "Tools", icon: ListTodo, href: "/admin/events/tools" },
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
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        
        {/* Sidebar with Glassmorphism */}
        <Sidebar className="border-r border-border/40 bg-surface/40 backdrop-blur-xl shadow-sm transition-all duration-300" collapsible="icon">
          <SidebarHeader className="p-4 md:p-6 border-b border-border/20 flex flex-row items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 group">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-background font-serif font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                   F
                 </div>
                 <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 group-hover:to-primary transition-all">
                   TheFesta
                 </span>
              </a>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4 gap-6 no-scrollbar">
            {MENU_GROUPS.map((group, index) => (
              <SidebarGroup key={index} className="p-0">
                <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium mb-2">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {group.items.map((item) => {
                      const isActive = location === item.href;
                      return (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive}
                            tooltip={item.label}
                            className={`
                              h-10 rounded-lg px-3 transition-all duration-200
                              ${isActive 
                                ? "bg-accent/10 text-accent font-medium shadow-[0_0_15px_-3px_rgba(147,51,234,0.15)]" 
                                : "text-muted-foreground hover:bg-surface hover:text-primary hover:translate-x-1"
                              }
                            `}
                          >
                            <Link href={item.href}>
                              <a className="flex items-center gap-3 w-full">
                                <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-accent" : "opacity-70"}`} />
                                <span className="text-sm">{item.label}</span>
                                {isActive && (
                                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                                )}
                              </a>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          
          {/* User Profile Snippet (Mock) */}
          <div className="mt-auto p-4 border-t border-border/20 mx-3 mb-2">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface/50 transition-colors cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 border-2 border-background shadow-sm" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate group-hover:text-accent transition-colors">Admin User</span>
                <span className="text-[10px] text-muted-foreground">Pro License</span>
              </div>
              <Settings className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Sidebar>
        
        {/* Main Content Area - Refined Background */}
        <main className="flex-1 overflow-auto bg-surface/30 relative">
          {/* Subtle Grain Texture Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPgo8cmVjdCB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPScjZmZmJy8+CjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyNjY2MnLz4KPC9zdmc+')] opacity-[0.03] pointer-events-none z-0 fixed" />
          
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-full relative z-10 animate-in fade-in duration-500">
            <Switch>
               <Route path="/admin" component={Dashboard} />
               <Route path="/admin/content/pages" component={PageEditor} />
               <Route>
                  <div className="flex flex-col items-center justify-center h-[70vh] text-center opacity-60">
                    <div className="w-20 h-20 bg-surface/50 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-border shadow-xl">
                       <Settings className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">Under Construction</h2>
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
