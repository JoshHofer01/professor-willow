import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn/sidebar";
import Link from "next/link";
import { pages } from "@/utils/sitePages";
import { ChevronDownIcon, Minus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./shadcn/collapsible";

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
              <SidebarGroup>
                <SidebarMenu>
                  {pages.map((page) => (
                    <Collapsible key={page.title} className="group/collapsible" defaultOpen={true}>
                      {page.showsOnSidebar && (
                        <SidebarMenuItem className="my-1">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="font-semibold">
                              <Link
                                href={page.href}
                                className="flex flex-row gap-2"
                              >
                                <page.icon />
                                <span>{page.title}</span>
                              </Link>
                              {page.hasMenu && (
                                <>
                                  <ChevronDownIcon className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                  <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                </>
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          {page.hasMenu ? (
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {page.components?.map((page) => (
                                  <SidebarMenuSubItem key={page.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link href={page.href}>{page.title}</Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          ) : null}
                        </SidebarMenuItem>
                      )}
                    </Collapsible>
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
