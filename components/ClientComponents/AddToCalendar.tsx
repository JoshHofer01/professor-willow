"use client";

import { GameEvent } from "@/interfaces/interfaces";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import React from "react";

function AddToCalendar({ eventDetails }: { eventDetails: GameEvent }) {
  // ScrapedDuck sends global events in UTC ("...Z") and local-time events
  // without an offset. The library drops the "Z", so say which it is.
  const isUtc = /Z$/i.test(eventDetails.start);

  return (
    <AddToCalendarButton
      name={eventDetails.name}
      options={["Apple", "Google"]}
      location="Pokemon GO"
      startDate={eventDetails.start}
      endDate={eventDetails.end}
      timeZone={isUtc ? "UTC" : "currentBrowser"}
      buttonStyle="round"
      hideCheckmark
      hideBranding
      size="6|4|5"
      organizer="professorwillow.me|josh@professorwillow.me"
      
    ></AddToCalendarButton>
  );
}

export default AddToCalendar;
