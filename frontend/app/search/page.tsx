"use client";
import { FaSearch } from "react-icons/fa";
import EventList from "@/app/search/components/EventList";
import { Event } from "@/config/dbtypes";
import CollapsableConfig from "@/app/search/components/CollapsableConfig";
import FilterInput from "@/app/search/components/FilterInput";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { searchEvents } from "@/api/event";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TagList from "@/app/search/components/TagList";

// Filters
// - Date Range
// - Time
//   - All-day
//   - Support for multiday events with different times?
// - Location
// - Tags
// - Organizations
// - Sort by
// - Search bar

// Topic Page (browse popular tags)
// Tag page (browse events with a specific tag)

// By default, search1 will be for future events

const sortOptions = [
  "Chronological",
  "Date Posted",
  "Date Updated",
  "Alphabetical (A-Z)",
  "Alphabetical (Z-A)",
  "Most Popular",
];
const viewOptions = ["List View", "Calendar View"];
export default function Search() {
  const { user } = useAuth();
  const [query, setQuery] = useState<string | undefined>(undefined); // TODO: bring the query into a context. Will make things faster
  const [results, setResults] = useState<Event[] | undefined>(undefined);
  // TODO: these filter params are going to be done in a very inneeficient way. Need to change this. Currently will have a bajillion states
  const [newTag, setNewTag] = useState<HTMLInputElement | undefined>(undefined);
  const [name, setNewName] = useState<HTMLInputElement | undefined>(undefined);
  const searchParams = useSearchParams();

  const handleSearch = async () => {
    // response is an array of events that are similar to the query
    const response = await searchEvents(query!);
    setResults(response);
  };

  // update the query according the url on mount (might need to change if component doesn't remount everytime the url changes)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // TODO: change this to router?
    const queryParam = urlParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      console.log(queryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);
  
  const updateQuery = () => { // TODO: make this add to currently existing tags instead of replacing the tabs query
    // TODO: able to handle more than one tag
    const params = new URLSearchParams(window.location.search);
    if (newTag) {
      params.append('tag', newTag.value);
    }
    if (name) {
      params.append('name', name.value);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    setQuery(params.toString());
  }

  return (
    <div className="flex flex-row w-full grow justify-center bg-white">
      <div className="flex flex-col grow-0 h-full min-h-fit basis-[1500px] relative">
        {/* Banner footer */}
        <div
          className="flex w-full border-b-[1px] border-gray-200 min-h-12 items-center
        sticky top-0 bg-white z-20"
        >
          <div className="px-3">
            <select className="bg-gray-100 text-md px-1 outline-0">
              {viewOptions.map((option) => (
                <option key={option} className="bg-white">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex grow">
            <TagList />
          </div>

          <div className="flex border-l-[1px] border-gray-200 px-3 py-1 items-center shrink-0">
            <span className="mr-2">Sort by:</span>
            <select className="bg-gray-200 p-1 outline-0">
              {sortOptions.map((option) => (
                <option key={option} className="bg-gray-200">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 grow">
          <div className="px-5 py-5 basis-72 shrink-0">
            <div className="flex gap-2">
              <div className="text-lg font-semibold">Search For: </div>
              <select className="bg-gray-100 text-lg px-1 outline-0 font-semibold">
                <option className="font-semibold bg-white">Event</option>
                <option className="font-semibold bg-white">Organization</option>
              </select>
            </div>
            <CollapsableConfig title="Name">
              <FilterInput onChange={(val) => {setNewName(val)}} onEnter={updateQuery}/>
            </CollapsableConfig>
            <CollapsableConfig title="Tag">
              <FilterInput onChange={(val) => {setNewTag(val)}} onEnter={updateQuery}/>
            </CollapsableConfig>
            <button className="bg-maroon text-white w-full py-2 rounded-lg" onClick={()=>{updateQuery()}}>Submit</button>
          </div>

          <div className="grow py-3 px-5">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <h3>3 results (0.12 seconds)</h3>
            {!results ? (
              <div>
                <p>No Results</p>
              </div>
            ) : (
              <EventList events={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
