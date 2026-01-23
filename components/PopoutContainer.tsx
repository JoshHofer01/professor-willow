import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";

const PopoutContainer = ({
  triggerChildren,
  title,
  description,
  contentChildren,
  className,
}: {
  triggerChildren: React.ReactNode;
  title: string;
  description: string;
  contentChildren: React.ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
        {triggerChildren}
      </DialogTrigger>
      <DialogHeader className="hidden">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent showCloseButton={false} className={className}>
        {contentChildren}
      </DialogContent>
    </Dialog>
  );
};
export default PopoutContainer;
