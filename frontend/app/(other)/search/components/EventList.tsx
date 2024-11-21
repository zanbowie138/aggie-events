"use client";
import React, { Suspense, useEffect, useState } from "react";
import EventDisplay from "@/app/(other)/search/components/event-display/EventDisplay";
import { SearchEventsReturn } from "@/api/event";

export default function EventList({
  events,
}: {
  events: SearchEventsReturn[] | undefined;
}) {
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
        <Suspense fallback={<div>Loading...</div>}>
          {events.map((event: SearchEventsReturn) => (
            <EventDisplay event={event} key={event.event_id} />
          ))}
        </Suspense>
      </div>
    );
  }
}
