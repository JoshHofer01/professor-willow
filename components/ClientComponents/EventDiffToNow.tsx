"use client";
import React, { useEffect, useState } from "react";

export const EventDiffToNow = ({
  eventEnd,
  short = false,
}: {
  eventEnd: string;
  short?: boolean;
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const targetDate = new Date(eventEnd);
      const now = new Date();
      const ms = targetDate.getTime() - now.getTime();

      setDays(Math.floor(ms / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((ms / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((ms / (1000 * 60)) % 60));
    };

    calculateTimeDifference();

    const interval = setInterval(calculateTimeDifference, 60 * 1000);
    return () => clearInterval(interval);
  }, [eventEnd]);

  return (
    <>
      {short ? (
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          {days === 0 ? (
            <div className="flex flex-row gap-1">
              <div className="flex flex-row">
                <p className="font-bold">{hours}</p>
                <p>H</p>
              </div>
              <div className="flex flex-row">
                <p className="font-bold">{minutes}</p>
                <p>M</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <div className="flex flex-row">
                <p className="font-bold">{days}</p>
                <p>D</p>
              </div>
              <div className="flex flex-row">
                <p className="font-bold">{hours}</p>
                <p>H</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <div className="flex flex-row gap-1">
            <div className="flex flex-row">
              <p className="font-bold">{days}</p>
              <p>D</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold">{hours}</p>
              <p>H</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold">{minutes}</p>
              <p>M</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
