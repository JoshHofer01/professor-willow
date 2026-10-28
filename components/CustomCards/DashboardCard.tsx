// components/dashboard-card.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "../shadcn/button";

export type CardSize = "default" | "wide" | "tall" | "large" | "xlWide" | "xlTall";

export interface DashboardCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  button?: {
    text: string,
    href: string,
    className?: string,
    icon?: LucideIcon
    target?: string
  }
}

export function DashboardCard({
  title,
  description,
  children,
  action,
  className,
  button,
}: DashboardCardProps) {
  return (
    <Card className={cn("flex flex-col py-6", className)}>
      <CardHeader className="">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {action && (<div className="shrink-0">{action}</div>)}
        </div>
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
      {button && 
      <CardFooter className="flex w-full justify-end-safe">
        <Button asChild className={cn("mt-2", button.className)}>
          <Link href={button.href} target={button.target ? button.target : "_self"}>
            {button.icon && <button.icon aria-hidden="true" />}
            <span>{button.text}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>}
    </Card>
  );
}