import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { GameEvent } from "@/interfaces/interfaces";
import Image from "next/image";
import { weServTransformURL } from "@/utils/weServTransform";
import AddToCalendar from "../ClientComponents/AddToCalendar";
import Link from "next/link";
import EventTypeBadge, { eventTypeColorMap } from "./EventTypeBadge";
import { cn } from "@/lib/utils";
import { Button } from "../shadcn/button";
import { dateFormatter } from "@/utils/dateFormatter";
import Countdown from "./Countdown";

const EventPopout = ({
  children,
  gameEvent,
}: {
  children: React.ReactNode;
  gameEvent: GameEvent;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogHeader className="hidden">
        <DialogTitle>{gameEvent.name}</DialogTitle>
        <DialogDescription>{gameEvent.name}</DialogDescription>
      </DialogHeader>
      <DialogContent showCloseButton={false} className="max-w-[calc(100%-2rem)] sm:max-w-lg md:max-w-xl">
        {/* Image */}
        <div className="flex flex-col">
          <Image
            src={weServTransformURL(gameEvent.image, "popoutImage")}
            width={560}
            height={310}
            alt={gameEvent.name}
            className={cn(eventTypeColorMap[gameEvent.eventType], "rounded-lg border-x-3 border-t-3")}
          />
          <EventTypeBadge eventType={gameEvent.eventType} eventHeading={gameEvent.heading} className="rounded" />
        </div>
        <div id="content" className="flex flex-col gap-1">
          {/* Title */}
          <h3 className="text-2xl sm:text-xl font-bold">{gameEvent.name}</h3>
          {/* Dates */}
          <div className="flex flex-row gap-2">
            <p>{dateFormatter.format(new Date(gameEvent.start))}</p>
            <p>-</p>
            <p>{dateFormatter.format(new Date(gameEvent.end))}</p>
          </div>
          {/* LeekDuck URL */}
          <Link
            href={gameEvent.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 text-primary/80 text-xs"
          >
            {gameEvent.link}
          </Link>
        </div>
        <DialogFooter>
          {/* Timing badge */}
          <Button variant="outline" className="rounded-3xl max-w-47.5 h-11.25"><Countdown event={gameEvent} /></Button>
          {/* AddToCalendar */}
          {new Date() < new Date(gameEvent.start) ? (
            <AddToCalendar eventDetails={gameEvent} />
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopout;
