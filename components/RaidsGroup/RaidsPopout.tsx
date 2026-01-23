import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { RaidPokemon } from "@/interfaces/interfaces";

const RaidsPopout = ({
  children,
  raidInfo,
}: {
  children: React.ReactNode;
  raidInfo: RaidPokemon;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogHeader className="hidden">
        <DialogTitle>{raidInfo.names.English}</DialogTitle>
        <DialogDescription>{raidInfo.names.English}</DialogDescription>
      </DialogHeader>
      <DialogContent className="max-w-xs sm:max-w-fit">
        {/* Content */}
        <div className="flex">
          {raidInfo.names.English}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RaidsPopout;
