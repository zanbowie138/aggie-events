"use client";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import IconLabel from "@/app/search/components/IconLabel";
import EventCard from "@/app/search/components/EventCard";
import { motion } from "framer-motion";
import { Event } from "@/config/dbtypes";
import { SearchEventsReturn } from "@/api/event";

const hasOrg = true;

export default function EventDisplay({ event }: { event: SearchEventsReturn }) {
  return (
    <div>
      <motion.div
        className="flex gap-2 max-w-[800px]"
        initial={{
          opacity: 0,
          transform: "translateY(4px)",
        }}
        animate={{
          transform: "translateY(0px)",
          opacity: 1,
        }}
      >
        <div className="flex flex-col border-r-2 border-gray-100 shrink-0 pr-2 ">
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
          {event.event_location && (
            <IconLabel text={event.event_location}>
              <FaLocationDot color="maroon" />
            </IconLabel>
          )}
          <IconLabel text={event.start_time.toString()}>
            <FaClock color="maroon" />
          </IconLabel>
        </div>
        <EventCard event={event} />
      </motion.div>
    </div>
  );
}
