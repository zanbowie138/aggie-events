import React from "react";
import EventDisplay, { Event } from "./EventDisplay";


export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <EventDisplay event={event} />
      ))}
    </div>
  );
}
