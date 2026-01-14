import { Calendar, LucideIcon, Mail } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

interface ItemProps {
  text: string;
  icon?: LucideIcon;
  href: Url;
}

interface ItemGroupProps {
  titleText: string;
  children: React.ReactNode;
}

const ItemGroup = ({ titleText, children }: ItemGroupProps) => {
  return (
    <div className="flex flex-col pl-3 md:gap-x-4 gap-y-1 border-l border-muted-foreground">
      <p className="text-sm text-muted-foreground">{titleText}</p>
      {children}
    </div>
  );
};

const Item = ({ text, icon: ItemIcon, href }: ItemProps) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex flex-row gap-1">
        {ItemIcon && <ItemIcon size={18} />}
        <p className="text-sm">{text}</p>
      </div>
    </Link>
  );
};

const PageFooter = () => {
  return (
    <>
    <div className="flex flex-col mt-4 text-xs mx-auto text-muted-foreground text-center">
        <span className="mx-2">
          If data on this page is incorrect or not up-to-date, please refresh page to force an update.
        </span>
      </div>
    <div className="ml-4 md:ml-6 pt-2 pb-4 flex flex-col">
      <div className=" text-muted-foreground text-sm">
        <p>
          ProfessorWillow is an unaffiliated fan project designed for creative and educational purposes.
        </p>
        <p>
          Pokemon GO, game content, and materials are trademarks and copyrights
          of Nintendo, The Pokémon Company, and Scopely.
        </p>
      </div>
      <div className="flex mt-4 md:flex-row md:gap-10 flex-col gap-4">
        <ItemGroup titleText="Community Links">
          <Item
            text="Discord"
            href="https://discord.gg/dvHNCQ8byh"
          />
        </ItemGroup>
        <ItemGroup titleText="Project Links">
          <Item text="Github" icon={Calendar} href="https://github.com/JoshHofer01/professor-willow" />
          <Item text="Email Me" icon={Mail} href="mailto:josh@professorwillow.me" />
        </ItemGroup>
        <ItemGroup titleText="Site Info">
          <Item text="Legal Information" href="/legal" />
        </ItemGroup>
      </div>
    </div>
    </>
  );
};

export default PageFooter;
