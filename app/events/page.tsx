import Image from "next/image";
import React from "react";

interface GameEvent {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
}

const EventsPage = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json"
  );
  const eventsData: GameEvent[] = await response.json();
  //console.log(eventsData);

  return (
    <>
      <h1 className="text-3xl font-bold pb-2">Events Calendar</h1>
      <ul>
        {eventsData.map((gameEvent) => (
          <li
            key={gameEvent.eventID}
            className="max-w-3/4 border border-foreground my-1 p-2"
          >
            <div className="flex flex-row gap-2">
              {gameEvent.name}
              <Image
                src={gameEvent.image}
                alt={gameEvent.name}
                width={50}
                height={0}
              />
            </div>

            <div>
              <p>Start Date: {gameEvent.start}</p>
              <p>End Date: {gameEvent.end}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;
