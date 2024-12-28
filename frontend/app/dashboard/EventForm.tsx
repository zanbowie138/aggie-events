"use client";
import React, { useEffect, useState } from "react";
import { EventCreate } from "@/config/query-types";
import { FaLocationDot } from "react-icons/fa6";
import { createEvent } from "@/api/event";
import ToastManager from "@/components/toast/ToastManager";
import { TimeInput, TimeInputValue } from "@nextui-org/date-input";
import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today, CalendarDate, Calendar, toTimeZone } from "@internationalized/date";

// TODO: add delete event functionality and update event functionality
// TODO clear the items in the form after succesful event creation

export default function EventForm() {
  // TODO: use proper useStates
  const [eventName, setEventName] = useState<string>();
  const [eventDescription, setEventDescription] = useState<string>();
  const [eventLocation, setEventLocation] = useState<string>();
  const [startTime, setStartTime] = useState<TimeInputValue>();
  const [endTime, setEndTime] = useState<TimeInputValue>();
  const [startDate, setStartDate] = useState<CalendarDate | null>(today(getLocalTimeZone()));
  const [endDate, setEndDate] = useState<CalendarDate | null>(today(getLocalTimeZone()));
  const [tags, setTags] = useState<string>();
  const [value, setValue] = useState<Date | null>(null);

  const setDateTime = (date: CalendarDate, time: TimeInputValue) => {
    console.log("time zone code" + getLocalTimeZone());
    const dateObj = date.toDate('gmt');
    const dateTime = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), time.hour, time.minute)); // will prevent it from applying an offset to convert to UTC +0 time. Remember, it stores the date in the database with no timezone id, then just decides the timezone when u get it later; this works bc its gonna convert to GMT anyways and if it starts from UTC +0 there's no conversion necessary
    return dateTime;
  }


  useEffect(() => {
    if (startDate){
      console.log(startDate);
      setEndDate(startDate);
    }
  }, [startDate]);

  const addEvent = async () => {
    const event: EventCreate = {
      event_name: eventName!,
      event_description: eventDescription?.trim() || null,
      event_location: eventLocation?.trim() || null,
      start_time: setDateTime(startDate!, startTime!),
      end_time: setDateTime(endDate!, endTime!),
      tags: tags?.split(",").map((tag) => tag.trim()) || [],
    };
    console.log(event as EventCreate);
    console.log("start time", event.start_time.toISOString());
    createEvent(event)
      .then((res) => {
        ToastManager.addToast("Event created successfully", "success");
        console.log(res);
      })
      .catch((err) => {
        ToastManager.addToast("Error creating event", "error");
        console.log(err);
      });
  };

  return (
    <>
      <div className="my-2">
        <div className="flex flex-col w-[700px] gap-1">
          <input
            type="text"
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="border border-gray-300 bg-gray-100 p-1 rounded mr-2 text-lg"
          />
          <div className="flex gap-2 items-center">
            <TimeInput
              isRequired
              label="Start Time"
              aria-label="start-time-input"
              radius="sm"
              description="A or P key to switch AM/PM"
              onChange={(e) => {setStartTime(e); console.log(typeof e);}}
            />
            <DatePicker
              defaultValue={today(getLocalTimeZone())}
              aria-label="start-date-input"
              label="Start Date"
              className="max-w-[284px]"
              isRequired
              radius="sm"
              description="Enter start date"
              showMonthAndYearPickers
              onChange={(e) => setStartDate(e)}
            />
            <div>to</div>
            <TimeInput
              isRequired
              label="End Time"
              aria-label="end-time-input"
              radius="sm"
              description="A or P key to switch AM/PM"
              onChange={(e) => setEndTime(e)}
            />
            <DatePicker
              defaultValue={today(getLocalTimeZone())}
              aria-label="end-date-input"
              label="End Date"
              className="max-w-[284px]"
              isRequired
              radius="sm"
              description="Enter end date"
              showMonthAndYearPickers
              onChange={(e) => setStartDate(e)}
              value={endDate}
            />
          </div>
          <div className="flex items-center gap-1 text-md mt-5">
            <FaLocationDot color="maroon" />
            <input
              type="text"
              placeholder="Add location..."
              onChange={(e) => setEventLocation(e.target.value)}
              className="border border-gray-300 bg-gray-100 p-1 rounded mr-2"
            />
          </div>
          <textarea
            placeholder="Add description..."
            onChange={(e) => setEventDescription(e.target.value)}
            className="border border-gray-300 bg-gray-100 p-1 rounded basis-32"
          />
          <textarea
            placeholder="Add tags (comma seperated)..."
            onChange={(e) => setTags(e.target.value)}
            className="border border-gray-300 bg-gray-100 p-1 rounded basis-32"
          />
          <button
            onClick={() => {
              addEvent();
            }}
            className="bg-maroon-500 text-white rounded-md px-2 py-1"
          >
            Create Event
          </button>
        </div> {/*TODO: clear all inputs when successful event submission*/}
      </div>
      <div className="mx-3 w-2/5">{/*<UserList update={update} />*/}</div>
    </>
  );
}
