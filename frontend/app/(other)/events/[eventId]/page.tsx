"use client";
import React, { useState, useEffect } from "react";
import { fetchEventById } from "@/api/event";
import { useParams, useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import IconLabel from "@/app/(other)/search/components/IconLabel";
import { formatDateInterval } from "@/utils/date";
import SoloTagDisplay from "@/components/tag/TagDisplay";
import { EventPageInformation } from "@/config/query-types";
import { FaCalendar, FaCalendarDay, FaClock, FaTag } from "react-icons/fa";
import FilterTagDisplay from "@/app/(other)/search/components/filter-tag-list/FilterTagDisplay";
import EventTagList from "@/components/tag/EventTagList";
import { MdEdit } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

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

const EventOptions: string[] = [
  "Add to Personal Calendar",
  "Add to Google Calendar",
  "Export as ICS",
  "Export event file",
];

function EventData({ event }: { event: EventPageInformation }) {
  return (
    <div className="bg-gray-100 rounded-b-lg shadow-md">
      <div className="bg-maroon rounded-t-lg h-[50px]"></div>
      <div className="flex flex-col gap-2  p-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-maroon">{event.event_name}</h1>
          <button className="bg-maroon text-white rounded-2xl py-1 px-4 ml-2 font-medium flex items-center gap-2">
            <div>Edit Event</div>
            <FiEdit />
          </button>
        </div>
        <div className="flex gap-6">
          <div className="border-maroon border-2 rounded-md px-4 pt-4 grow flex flex-col gap-1">
            <div>
              <IconLabel
                text={formatDateInterval(
                  new Date(event.start_time),
                  new Date(event.end_time),
                )}
              >
                <FaCalendarDay color="maroon" />
              </IconLabel>
              {event.event_location && (
                <IconLabel text={event.event_location}>
                  <FaLocationDot color="maroon" />
                </IconLabel>
              )}
            </div>
            <EventTagList tags={event.tags} />
          </div>
          <div className="border-2 border-maroon p-2 rounded-md h-fit">
            <ul className="text-center">
              {EventOptions.map((option, index) => (
                <li key={index} className="text-maroon">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="">
          <p className="text-md text-black">{event.event_description}</p>
        </div>
        <hr />

        <p className="text-gray-700">Posted by: {event.contributor_name}</p>
      </div>
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
