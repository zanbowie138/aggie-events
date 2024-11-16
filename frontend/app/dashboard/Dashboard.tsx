"use client";
import React, { useState } from "react";
import UserList from "./UserList";
import { useAuth } from "@/components/auth/AuthContext";
import { addUser, deleteUser } from "@/api/user";
import EventForm from "./EventForm";
import UserForm from "./UserForm";

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


