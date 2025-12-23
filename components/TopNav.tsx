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
import Link from "next/link";

const TopNav = () => {
  return (
    <NavigationMenu className="bg-nav md:hidden">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <div className="items-center flex flex-col ml-8 mr-3">
                <h1 className="text-sm font-bold">HOME</h1>
                <div className="w-11 h-0.5 bg-accent mx-auto"></div>
                {/* <h1 className="text-xl font-bold">Willow</h1> */}
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {pages.map((page) => (
          <NavigationMenuItem key={page.title} className={cn("my-1 mx-3 min-w-fit", page.hidesAt)}>
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
                <NavigationMenuContent>
                  <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {page.components?.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
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
