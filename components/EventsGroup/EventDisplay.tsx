import React from 'react'
import { GameEvent } from '@/interfaces/interfaces'
import { EventPageCard } from '../CustomCards/EventCards'


const EventDisplay = ({ events, pageType }: {events: GameEvent[], pageType: string}) => {
  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{pageType} events</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {events.length > 0 ? events.map((events) => (
            <EventPageCard key={events.eventID} event={events} />
        )) : <div>No {pageType.toLowerCase()} events found.</div>}
      </div>
    </main>
  )
}

export default EventDisplay