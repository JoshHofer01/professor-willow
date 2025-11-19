import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

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
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Pokedex",
    url: "/",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl mt-2">
            Professor
          </SidebarGroupLabel>
          <SidebarGroupLabel className="text-4xl">Willow</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton asChild className="text-xl font-semibold">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenuItem key={"settings"} className="my-1">
            <SidebarMenuButton asChild className="text-xl font-semibold justify-center">
              <Link href="/">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
