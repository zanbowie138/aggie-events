"use client";
import React, { useEffect, useState } from "react";
import EventDisplay from "../../search/components/EventDisplay";
import { Event } from "@/config/dbtypes";

export default function EventList({ events }: { events: Event[] | undefined }) {
  const [lastEvents, setLastEvents] = useState<Event[]>([]);

  if (!events) {
    return (
      <div className="my-2">
        <div>
          <p>No Results</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-3 my-2">
        {events.map((event: Event) => (
          <EventDisplay event={event} key={event.event_id} />
        ))}
      </div>
    );
  }
}
