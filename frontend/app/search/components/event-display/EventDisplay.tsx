"use client";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import IconLabel from "@/app/search/components/IconLabel";
import EventCard from "@/app/search/components/event-display/EventCard";
import { motion } from "motion/react";
import { SearchEventsReturn } from "@/api/event";
import { formatTimeInterval } from "@/utils/date";
import EventDateDisplay from "@/app/search/components/event-display/EventDateDisplay";

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
        <EventDateDisplay event={event} />
        <EventCard event={event} />
      </motion.div>
    </div>
  );
}
