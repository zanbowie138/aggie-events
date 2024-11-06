"use client";
import React, { useState, useEffect } from "react";
import { fetchEventByID } from "@/api/event";
import { Event } from "@/config/dbtypes";
import { useParams } from "next/navigation";

export default function EventDetails({
  params,
}: {
  params: { eventID: number };
}) {
  const [event, setEvent] = useState<Event | undefined | null>(undefined);
  const { eventID } = useParams<{ eventID: string }>();
  useEffect(() => {
    fetchEventByID(parseInt(eventID, 10))
      .then((eventData) => {
        setEvent(eventData);
        console.log(eventData);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        setEvent(null);
      });
  }, []);

  return (
    <>
      {event === undefined && <Loading />}
      {event === null && <EventNotFound />}
      {event && <EventData event={event} />}
    </>
  );
}

function EventData({ event }: { event: Event }) {
  return (
    <div className="flex flex-row w-full grow justify-center bg-gray-200">
      <div className="flex flex-col grow-0 h-full min-h-fit basis-[1500px] relative p-3">
        <h1 className="text-5xl font-bold text-maroon">{event.event_name}</h1>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-row w-full grow justify-center bg-gray-200">
      <div className="flex flex-col grow-0 h-full min-h-fit basis-[1500px] relative p-3">
        <h1 className="text-5xl font-bold text-maroon">Loading...</h1>
      </div>
    </div>
  );
}

function EventNotFound() {
  return (
    <div className="flex flex-row w-full grow justify-center bg-gray-200">
      <div className="flex flex-col grow-0 h-full min-h-fit basis-[1500px] relative p-3">
        <h1 className="text-5xl font-bold text-maroon">Event Not Found!</h1>
      </div>
    </div>
  );
}
