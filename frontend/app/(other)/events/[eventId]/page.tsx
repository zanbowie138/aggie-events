"use client";
import React, { useState, useEffect } from "react";
import { fetchEventById } from "@/api/event";
import { useParams, useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import IconLabel from "@/app/(other)/search/components/IconLabel";
import { formatDateInterval } from "@/utils/date";
import SoloTagDisplay from "@/components/tag/TagDisplay";
import { EventPageInformation } from "@/config/query-types";
import { FaClock } from "react-icons/fa";
import FilterTagDisplay from "@/app/(other)/search/components/filter-tag-list/FilterTagDisplay";
import EventTagList from "@/components/tag/EventTagList";

export default function EventDetails() {
  const [event, setEvent] = useState<EventPageInformation | undefined | null>(
    undefined,
  );
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    fetchEventById(parseInt(eventId, 10))
      .then((eventData) => {
        setEvent(eventData as EventPageInformation);
        console.log(eventData);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        setEvent(null);
      });
  }, []);

  return (
    <div className="flex flex-row w-full grow justify-center">
      <div className="flex flex-col grow-0 h-full min-h-fit basis-[900px] relative p-3">
        {/*TODO: Use query string parameters to allow user to go back to search page*/}
        {/*{document.referrer.includes("/search") && (*/}
        {/*  <button onClick={() => router.back()}>*/}
        {/*    <FaArrowLeft />*/}
        {/*    Back to search*/}
        {/*  </button>*/}
        {/*)}*/}
        {event === undefined && <Loading />}
        {event === null && <EventNotFound />}
        {event && <EventData event={event} />}
      </div>
    </div>
  );
}

// export interface EventPageInformation {
//   event_id: number;
//   event_name: string;
//   event_description: string | null;
//   event_location: string | null;
//   event_likes: number;
//   start_time: Date;
//   end_time: Date;
//   date_created: Date;
//   date_modified: Date;
//   contributor_name: string;
//   org_name: string | null;
//   org_id: number | null;
//   tags: string[];
// }

function EventData({ event }: { event: EventPageInformation }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-maroon">{event.event_name}</h1>
      <h2 className="font-semibold">
        {formatDateInterval(
          new Date(event.start_time),
          new Date(event.end_time),
        )}
      </h2>
      {event.event_location && (
        <IconLabel text={event.event_location}>
          <FaLocationDot color="maroon" />
        </IconLabel>
      )}
      <EventTagList tags={event.tags} />

      <p className="text-md text-black my-2">{event.event_description}</p>
      <hr />
      <p className="text-gray-400">Posted by: {event.contributor_name}</p>
    </div>
  );
}

function Loading() {
  return <h1 className="text-5xl font-bold text-maroon">Loading...</h1>;
}

function EventNotFound() {
  return (
    <>
      <h1 className="text-5xl font-bold text-maroon">Event Not Found!</h1>
    </>
  );
}
