"use client";
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
  "Most Popular",
  "Date Posted",
  "Date Updated",
  "Alphabetical (A-Z)",
  "Alphabetical (Z-A)",
];
const viewOptions = ["List View", "Calendar View"];

export default function Search() {
  const { user } = useAuth(); // TODO: choose a less confusing name than query. Query is the enter query string in the URL
  const [query, setQuery] = useState<string | undefined>(undefined); // TODO: bring the query into a context. Will make things faster
  const [results, setResults] = useState<Event[] | undefined>(undefined);
  // TODO: these filter params are going to be done in a very inneeficient way. Need to change this. Currently will have a bajillion states
  const [newTag, setNewTag] = useState<HTMLInputElement | undefined>(undefined);
  const [name, setNewName] = useState<HTMLInputElement | undefined>(undefined);
  const searchParams = useSearchParams(); // TODO: really need to clean up these state variables. Should create a query.ts to track everything
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [currentNames, setCurrentNames] = useState<string[]>([]);

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

  useEffect(() => { // TODO: change all this listening to one system based on url search params where everything is just listening for changes in the url search params instead of creating a bunch of random bs events
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tags = urlParams.getAll("tag");
      setCurrentTags(tags);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  // set the current tags and current name and query to the url search params on component mount (ex: if someone sent the link with the search in it)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tags = urlParams.getAll("tag");
    const name = urlParams.getAll("name");
    const query = urlParams.get("query");
    setCurrentTags(tags);
    setCurrentNames(name);
    setQuery(query ? query : "");
  }, []);
  
  const updateQuery = () => { // TODO: make this add to currently existing tags instead of replacing the tabs query // TODO: fix the results disappearing if submitting the same requests twice
    const params = new URLSearchParams(window.location.search); // TODO: set the value of the forms to blank after submitting
    if (newTag && !currentTags.includes(newTag.value)) {
      params.append('tag', newTag.value); // TODO: if the x is pressed on the tag it will disappear and get removed from the URL query
      setCurrentTags([...currentTags, newTag.value]);
    }
    if (name && !currentNames.includes(name.value)) {
      params.append('name', name.value);
      setCurrentNames([...currentNames, name.value]);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    setQuery(params.toString());
    if (newTag) newTag.value = "";
    if (name) name.value = "";
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
            <TagList tags={currentTags}/>
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
            <button className="bg-maroon text-white w-full py-2 rounded-lg" onClick={updateQuery}>Submit</button>
          </div>

          <div className="grow py-3 px-5">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <h3>3 results (0.12 seconds)</h3>
            <EventList events={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
