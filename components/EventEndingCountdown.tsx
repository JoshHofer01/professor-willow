"use client";
import React from "react";

export const EventEndingCountdown = ({ eventEnd }: { eventEnd: string }) => {
  const targetDate = new Date(eventEnd);

  // Get the time difference in milliseconds
  const now = new Date();
  const ms = targetDate.getTime() - now.getTime();

  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);

  return (
    <div className="flex flex-row gap-1 text-base">
        <p>Ends in</p>
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
  );
};
