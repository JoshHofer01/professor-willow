"use client";

import { GameEvent } from "@/interfaces/interfaces";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import React from "react";

function AddToCalendar({ eventDetails }: { eventDetails: GameEvent }) {
  return (
    <AddToCalendarButton
      name={eventDetails.name}
      options={["Apple", "Google"]}
      location="Pokemon GO"
      startDate={eventDetails.start}
      endDate={eventDetails.end}
      timeZone="currentBrowser"
      buttonStyle="round"
      hideCheckmark
      hideBranding
      size="6|4|5"
      organizer="professorwillow.me|josh@professorwillow.me"
      
    ></AddToCalendarButton>
  );
}

export default AddToCalendar;
