import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { pages } from "@/utils/sitePages";
import { Calendar, Home, Inbox, Settings } from "lucide-react";
import Link from "next/link";

const TopNav = () => {
  return (
    <NavigationMenu className="bg-sidebar pt-1 pb-2 md:hidden">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/">
            <div className="items-center flex flex-col ml-3 mr-3">
              <h1 className="text-sm mt-2 font-bold">Professor</h1>
              <h1 className="text-xl font-bold">Willow</h1>
            </div>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuList>
        {pages.map((page) => (
          <NavigationMenuItem key={page.title}>
            <NavigationMenuLink
              asChild
              className="mx-1 font-semibold flex-row data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50"
            >
              <Link href={page.href}>
                {/* {page.icon ? <page.icon /> : null} */}
                {page.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TopNav;
