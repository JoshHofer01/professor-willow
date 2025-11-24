import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { pages } from "@/utils/sitePages";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/">
          <SidebarGroupLabel className="text-3xl mt-2">
            Professor
          </SidebarGroupLabel>
          <SidebarGroupLabel className="text-4xl">Willow</SidebarGroupLabel>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {pages.map((page) => (
                <SidebarMenuItem key={page.title} className="my-1">
                  <SidebarMenuButton asChild className="text-xl font-semibold">
                    <Link href={page.href}>
                      <page.icon />
                      <span>{page.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenuItem key={"settings"} className="my-1">
            <SidebarMenuButton asChild className="text-lg font-semibold justify-center">
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
