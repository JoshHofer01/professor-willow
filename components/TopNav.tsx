'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";
import { cn } from "@/lib/utils";
import { pages } from "@/utils/sitePages";
import Image from "next/image";
import Link from "next/link";

const TopNav = () => {
  return (
    <NavigationMenu className="bg-nav md:hidden w-full z-10 sticky top-0">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <div className="items-center flex flex-col ml-4">
                <Image src="/ProfessorWillowHS.png" alt="ProfessorWillow" width={30} height={30} className="hover:scale-125 hover:transition hover:rotate-6"/>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {pages.map((page) => (
          <NavigationMenuItem key={page.title} className={cn("my-1 mx-auto min-w-fit", page.hidesAt)}>
            {!page.showsAtMin && !page.hasMenu ? (
              <NavigationMenuLink
                href={page.href}
                className="flex-row data-[active=true]:focus:bg-nav-accent data-[active=true]:hover:bg-nav-accent data-[active=true]:nav-accent/50 hover:bg-nav-accent focus:bg-nav-accent focus:text-nav-accent-foreground focus-visible:ring-ring/50"
              >
                {page.title}
              </NavigationMenuLink>
            ) : page.showsAtMin && !page.hasMenu ? (
              <NavigationMenuLink
                href={page.href}
                className="flex-row data-[active=true]:focus:bg-nav-accent data-[active=true]:hover:bg-nav-accent data-[active=true]:nav-accent/50 hover:bg-nav-accent focus:bg-nav-accent focus:text-nav-accent-foreground focus-visible:ring-ring/50"
              >
                {page.title}
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger className="flex-row data-[active=true]:focus:bg-nav-accent data-[active=true]:hover:bg-nav-accent data-[active=true]:nav-accent/50 hover:bg-nav-accent focus:bg-nav-accent focus:text-nav-accent-foreground focus-visible:ring-ring/50">
                  {page.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2">
                  <ul className="flex flex-col sm:w-100 md:w-125 lg:w-150">
                    {page.components?.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        className="hover:bg-muted-foreground/25 rounded-sm"
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TopNav;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
