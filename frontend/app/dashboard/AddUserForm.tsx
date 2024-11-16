"use client";
import React, { useState } from "react";
import UserList from "./UserList";
import { useAuth } from "@/components/auth/AuthContext";
import { addUser, deleteUser } from "@/api/user";
import { testAuth } from "@/api/auth";
import { Event } from "@/config/dbtypes";
import { EventCreate } from "@/config/query-types";
import IconLabel from "@/app/search/components/IconLabel";
import { FaLocationDot } from "react-icons/fa6";
import { createEvent } from "@/api/event";
import ToastManager from "@/components/toast/ToastManager";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";


export default function Dashboard() {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(0);
  const options = ["Users", "Events", "Organizations"];
  return (
    <div className="flex grow justify-center mt-5 h-full">
      <div className="max-w-[1000px] w-full">
        <ul className="flex gap-2">
          {options.map((option, i) => (
            <li
              className={
                "px-3 py-1 rounded-t-lg " +
                (page === i && "bg-maroon-500 text-white")
              }
              key={i}
            >
              <button onClick={() => setPage(i)}>{option}</button>
            </li>
          ))}
        </ul>
        <div className="p-2 bg-gray-200 rounded-b-lg">
          {user && (
            <h1 className="text-xl font-bold">Welcome, {user.user_name}!</h1>
          )}
          {page === 0 && <UserForm />}
          {page === 1 && <EventForm />}
        </div>
      </div>
    </div>
  );
}

function UserForm() {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <>
      <div className="my-2">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="border border-gray-300 bg-gray-100 p-1 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 bg-gray-100 p-1 rounded mr-2"
        />
        <button
          onClick={() => {
            addUser(username!, email!);
            setUpdate(!update);
          }}
          className="bg-blue-500 rounded-md px-2 py-1"
        >
          Create user
        </button>
      </div>
      <div className="my-2">
        <button
          className="bg-red-400 rounded-md px-2 py-1"
          onClick={() => {
            deleteUser();
            setUpdate(!update);
          }}
        >
          Delete users
        </button>
      </div>
      <div className="mx-3 w-2/5">
        <UserList update={update} />
      </div>
    </>
  );
}

function EventForm() {
  const [eventName, setEventName] = useState<string>();
  const [eventDescription, setEventDescription] = useState<string>();
  const [eventLocation, setEventLocation] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [tags, setTags] = useState<string>();
  const [value, setValue] = useState<Date | null>(null);

  const addEvent = async () => {
    const event: EventCreate = {
      event_name: eventName!,
      event_description: eventDescription?.trim() || null,
      event_location: eventLocation?.trim() || null,
      start_time: new Date(startTime!),
      end_time: new Date(endTime!),
      tags: tags?.split(",").map((tag) => tag.trim()) || [],
    };
    console.log(event as EventCreate);
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={(newValue: Dayjs | null) => setValue(newValue ? newValue.toDate() : null)} />
            </LocalizationProvider>
            <div>to</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={(newValue: Dayjs | null) => setValue(newValue ? newValue.toDate() : null)} />
            </LocalizationProvider>
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
        </div>
      </div>
      <div className="mx-3 w-2/5">{/*<UserList update={update} />*/}</div>
    </>
  );
}
