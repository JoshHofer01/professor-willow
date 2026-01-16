import React from 'react'
import { EventDiffToNow } from '../ClientComponents/EventDiffToNow';
import { GameEvent } from '@/interfaces/interfaces';
import { cn } from '@/lib/utils';

export const Countdown = ({ event, className }: { event: GameEvent, className?: string }) => {
  return (
    <>
      {event.status === "live" ? (
        <div className={cn(className, "text-xs text-muted-foreground space-y-1")}>
          <div className="flex flex-row space-x-1">
            <p>
              <strong>Ends in:</strong>
            </p>
            <EventDiffToNow eventEnd={event.end} />
          </div>
        </div>
      ) : event.status === "upcoming" ? (
       <div className={cn(className, "text-xs text-muted-foreground space-y-1")}>
          <div className="flex flex-row space-x-1">
            <p>
              <strong>Starts in:</strong>
            </p>
            <EventDiffToNow eventEnd={event.start} />
          </div>
        </div>
      ) : (
        <div className={cn(className, "text-xs text-muted-foreground space-y-1")}>
          <p>Ended</p>
        </div>
      )}
    </>
  );
};

export default Countdown