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
  Menu,
  Moon,
  Sun,
  User,
  CreditCard,
  LogOut,
  Bell
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dashboard from "./Dashboard";
import PageEditor from "./content/PageEditor";
import Employees from "./org/Employees";

// Admin Layout Component
export function AdminLayout() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      ]
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        
        {/* Sidebar with Glassmorphism */}
        <Sidebar className="border-r border-border/40 bg-surface/40 backdrop-blur-xl shadow-sm transition-all duration-300" collapsible="icon">
          <SidebarHeader className="p-4 md:p-6 border-b border-border/40 flex flex-row items-center justify-between mb-2">
            <Link href="/">
              <a className="font-serif text-2xl text-primary hover:text-primary/80 transition-colors select-none tracking-tight">
                TheFesta
              </a>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="px-3 pt-2 pb-6 gap-6 no-scrollbar">
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
                                ? "bg-primary text-primary-foreground font-medium shadow-md" 
                                : "text-muted-foreground hover:bg-surface hover:text-primary hover:translate-x-1"
                              }
                            `}
                          >
                            <Link href={item.href}>
                              <a className="flex items-center gap-3 w-full">
                                <item.icon className={`w-[18px] h-[18px] ${isActive ? "opacity-100" : "opacity-70"}`} />
                                <span className="text-sm">{item.label}</span>
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
          
          {/* User Profile Dropdown */}
          <div className="mt-auto p-4 border-t border-border/40 mx-3 mb-2 flex flex-col gap-2 mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface/50 transition-colors cursor-pointer group data-[state=open]:bg-surface/50">
                  <div className="w-9 h-9 rounded-full bg-zinc-200 border border-border flex items-center justify-center text-xs font-medium text-muted-foreground overflow-hidden">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col overflow-hidden text-left">
                    <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">Admin User</span>
                    <span className="text-[10px] text-muted-foreground">Pro License</span>
                  </div>
                  <Settings className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[200px]" 
                side="top" 
                align="start"
                sideOffset={10}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@thefesta.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Sidebar>
        
        {/* Main Content Area - Refined Background */}
        <main className="flex-1 overflow-auto bg-surface/30 relative">
          {/* Subtle Grain Texture Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPgo8cmVjdCB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPScjZmZmJy8+CjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyNjY2MnLz4KPC9zdmc+')] opacity-[0.03] pointer-events-none z-0 fixed" />
          
          {/* Top Right Theme Toggle */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border shadow-sm hover:shadow-md transition-all hover:bg-surface text-muted-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-full relative z-10 animate-in fade-in duration-500">
            <Switch>
               <Route path="/admin" component={Dashboard} />
               <Route path="/admin/content/pages" component={PageEditor} />
               <Route path="/admin/org/employees" component={Employees} />
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
