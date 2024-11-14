"use client";
import CollapsableConfig from "@/app/search/components/filter-list/CollapsableConfig";
import FilterInput from "@/app/search/components/filter-list/FilterInput";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterTagList from "@/app/search/components/filter-tag-list/FilterTagList";
import {
  SearchFilters,
  setFilterParam,
  castFilterParam,
} from "@/config/query-types";
import { searchEvents, SearchEventsReturn } from "@/api/event";
import { Event } from "@/config/dbtypes";
import EventList from "@/app/search/components/EventList";
import FilterList, {
  FilterListOutput,
} from "@/app/search/components/filter-list/FilterList";

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

// By default, search will be for future events

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
  const searchParams = useSearchParams();
  const filters = useRef<SearchFilters>(getFilters());
  const pathname = usePathname();
  const { push } = useRouter();
  const [results, setResults] = useState<SearchEventsReturn[] | undefined>(
    undefined,
  );
  // Mostly to trigger a re-render when the tags are updated
  const [tags, setTags] = useState<string[]>(
    filters.current.tags ? Array.from(filters.current.tags) : [],
  );
  const [duration, setDuration] = useState<number>(0);

  // Returns SearchFilters object from the URL query parameters
  function getFilters(): SearchFilters {
    const params = new URLSearchParams(searchParams);
    let newFilters: SearchFilters = {};
    for (const [key, value] of params.entries()) {
      const castKey = key as keyof SearchFilters;
      const val = castFilterParam(key, value);
      setFilterParam(newFilters, castKey, val);
    }
    console.log("Filters: ", newFilters);
    return newFilters;
  }

  useEffect(() => {
    filters.current = getFilters();
    console.log("Searching with parameters: " + filters.current.name);
    searchEvents(searchParams.toString()).then((res) => {
      console.log("Search results: ", res);
      setResults(res.events);
      setDuration(res.duration);
    });
  }, [searchParams]);

  // Updates the query parameters in the URL using the filter-list variable
  function updateUrl() {
    // Manipulate url query parameters
    const params = new URLSearchParams(searchParams);
    Object.keys(filters.current).forEach((key) => {
      const val = filters.current[key as keyof SearchFilters];
      if (val) {
        // TODO: Consider just hard typing this to remove jank
        if (val instanceof Set) {
          if (val.size > 0) {
            params.set(key, Array.from(val).join(","));
          } else {
            params.delete(key);
          }
        } else if (Array.isArray(val)) {
          params.set(key, val.join(","));
        } else {
          params.set(key, val.toString());
        }
      } else {
        params.delete(key);
      }
    });
    if (filters.current.tags) {
      setTags(Array.from(filters.current.tags!));
    }
    push(`${pathname}?${params.toString()}`);
  }

  function updateFilters(filtersUpdate: FilterListOutput) {
    // Update the filter-list object
    filters.current = {
      ...filters.current,
      name: filtersUpdate.name?.trim(),
    };

    console.log("Updating Filters: ", filtersUpdate.tag);

    // Add the tag to the set of tags
    if (filtersUpdate.tag) {
      if (filters.current.tags) {
        filters.current.tags.add(filtersUpdate.tag!.trim());
      } else {
        filters.current = {
          ...filters.current,
          tags: new Set([filtersUpdate.tag!.trim()]),
        };
      }
    }

    updateUrl();
  }

  return (
    <div className="flex flex-row w-full grow justify-center">
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
            {tags && (
              <FilterTagList
                tags={tags}
                onTagClose={(tag) => {
                  filters.current.tags?.delete(tag);
                  updateUrl();
                }}
              />
            )}
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
            <FilterList onSubmit={updateFilters} />
          </div>

          <div className="grow py-3 px-5">
            <h1 className="text-2xl font-bold">Search Results</h1>
            {results && (
              <h3>
                {results.length} results ({duration.toFixed(2)} ms)
              </h3>
            )}
            <EventList events={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
