import React from "react";
import IconLabel from "@/app/search/components/IconLabel";
import { FaLocationDot } from "react-icons/fa6";
import { formatTimeInterval } from "@/utils/date";
import { FaClock } from "react-icons/fa";
import { SearchEventsReturn } from "@/api/event";

export default function EventDateDisplay({
  event,
}: {
  event: SearchEventsReturn;
}) {
  return (
    <div className="flex flex-col border-r-2 border-gray-100 shrink-0 pr-2 basis-[150px]">
      <div className="text-maroon-400 font-semibold text-xl">
        {new Date(event.start_time).toLocaleDateString("en-US", {
          weekday: "long",
        }) + ","}
      </div>
      <div className="font-semibold text-xl">
        {new Date(event.end_time).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}
      </div>
      <IconLabel
        text={formatTimeInterval(event.start_time, event.end_time)}
        className="text-sm"
      >
        <FaClock color="maroon" />
      </IconLabel>

      {event.event_location && (
        <IconLabel text={event.event_location} className="text-sm">
          <FaLocationDot color="maroon" />
        </IconLabel>
      )}
    </div>
  );
}
