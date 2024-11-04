import React from "react";
import EventDisplay, { Event } from "./EventDisplay";


export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className="flex flex-col gap-2" key={0}> // TODO: resolve the key error
      {events.map((event) => (
        <EventDisplay event={event} key={event.event_id}/>
      ))}
    </div>
  );
}
