// components/dashboard-card.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

export type CardSize = "default" | "wide" | "tall" | "large";

const sizeClasses: Record<CardSize, string> = {
  default: "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  large: "md:col-span-2 md:row-span-2",
};

export interface DashboardCardProps {
  title: string;
  description?: string;
  size?: CardSize;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  button?: {
    text: string,
    href: string,
    className?: string,
    icon?: LucideIcon
  }
}

export function DashboardCard({
  title,
  description,
  size = "default",
  children,
  action,
  className,
  button,
}: DashboardCardProps) {
  return (
    <Card className={cn("flex flex-col", sizeClasses[size], className)}>
      <CardHeader className="">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
      {button && 
      <CardFooter className="flex w-full justify-end-safe">
        <Link href={button.href} className={cn("mt-2", button.className)}>
          <Button className="w-full">
            {button.icon && <button.icon />}
            <p>{button.text}</p>
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>}
    </Card>
  );
}