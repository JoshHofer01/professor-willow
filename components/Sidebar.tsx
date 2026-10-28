"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn/sidebar";
import Link from "next/link";
import { useState } from "react";
import { pages, PageProps } from "@/utils/sitePages";
import { ChevronDownIcon, Minus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./shadcn/collapsible";

function SidebarPage({ page }: { page: PageProps }) {
  const [open, setOpen] = useState(page.title === "Events");

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarMenuItem className="my-1">
        {/* A link, not a button: opening the page also toggles its submenu. */}
        <SidebarMenuButton asChild className="font-semibold">
          <Link
            href={page.href}
            onClick={page.hasMenu ? () => setOpen((isOpen) => !isOpen) : undefined}
          >
            <page.icon />
            <span>{page.title}</span>
          </Link>
        </SidebarMenuButton>
        {page.hasMenu && (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction aria-label={`Toggle ${page.title} menu`}>
                <ChevronDownIcon className="group-data-[state=open]/collapsible:hidden" />
                <Minus className="group-data-[state=closed]/collapsible:hidden" />
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {page.components?.map((subPage) => (
                  <SidebarMenuSubItem key={subPage.title}>
                    <SidebarMenuSubButton asChild>
                      <Link href={subPage.href}>{subPage.title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/">
            <SidebarGroupLabel className="text-3xl mt-2 text-foreground">
              Professor
            </SidebarGroupLabel>
            <SidebarGroupLabel className="text-4xl text-foreground">Willow</SidebarGroupLabel>
          </Link>
          <div className="w-27 h-1 bg-accent mx-auto mt-2"></div>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              <SidebarGroup>
                <SidebarMenu>
                  {pages
                    .filter((page) => page.showsOnSidebar)
                    .map((page) => (
                      <SidebarPage key={page.title} page={page} />
                    ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
