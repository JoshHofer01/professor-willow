import { Calendar, LucideIcon, Twitter } from "lucide-react";
import React from "react";

interface ItemProps {
  text: string;
  icon?: LucideIcon;
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

const Item = ({ text, icon: ItemIcon }: ItemProps) => {
  return (
    <div className="flex flex-row gap-1">
      {ItemIcon && <ItemIcon size={18} />}
      <p className="text-sm">{text}</p>
    </div>
  );
};

const PageFooter = () => {
  return (
    <div className="pl-6 pt-2 pb-4 flex flex-col">
      <div className=" text-muted-foreground text-sm">
        <p>ProfessorWillow is not affiliated with Scopely</p>
        <p>
          Pokemon GO, game content, and materials, are trademarks and copyrights
          of Scopely
        </p>
      </div>
      <div className="flex mt-4 md:flex-row md:gap-10 flex-col gap-4">
        <ItemGroup titleText="Community Links">
          <Item text="Discord" />
        </ItemGroup>
        <ItemGroup titleText="Project Links">
          <Item text="Github" icon={Calendar} />
          <Item text="X (Formerly Twitter)" icon={Twitter} />
        </ItemGroup>
        <ItemGroup titleText="Site Info">
          <Item text="Privacy Policy" />
          <Item text="Cookie Settings" />
        </ItemGroup>
      </div>
    </div>
  );
};

export default PageFooter;
