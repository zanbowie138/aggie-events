"use client";
import CollapsableConfig from "@/app/search/components/CollapsableConfig";
import FilterInput from "@/app/search/components/FilterInput";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TagList from "@/app/search/components/TagList";
import { SearchFilters } from "@/config/query-types";

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
  const searchParams = useSearchParams();
  const filters = useRef<SearchFilters>(getFilters());
  const pathname = usePathname();
  const { push } = useRouter();

  function castParam(
    key: string,
    value: string,
  ): SearchFilters[keyof SearchFilters] {
    // TODO: Add all the other types
    switch (key) {
      case "tags":
        return new Set(value.split(" "));
      default:
        return value;
    }
  }

  // Get the filters from the URL query parameters
  function getFilters(): SearchFilters {
    const params = new URLSearchParams(searchParams);
    let newFilters: SearchFilters = {};
    console.log("Getting filters!");
    // TODO: Goofy ahh typescript
    for (const [key, value] of params.entries()) {
      const val = castParam(key, value);
      // TODO: Figure out how to type this
      newFilters[key as keyof SearchFilters] = val as any;
    }
    console.log("Filters: ", newFilters);
    return newFilters;
  }

  // Updates the query parameters in the URL using the filters variable
  function updateUrl() {
    // Manipulate url query parameters
    const params = new URLSearchParams(searchParams);
    Object.keys(filters.current).forEach((key) => {
      const val = filters.current[key as keyof SearchFilters];
      if (val) {
        // TODO: Consider just hard typing this to remove jank
        if (val instanceof Set) {
          params.set(key, Array.from(val).join(" "));
        } else if (Array.isArray(val)) {
          params.set(key, val.join(" "));
        } else {
          params.set(key, val.toString());
        }
      } else {
        params.delete(key);
      }
    });
    push(`${pathname}?${params.toString()}`);
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
            {filters.current.tags && (
              <TagList
                tags={filters.current.tags}
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

            <form>
              <CollapsableConfig title="Name">
                <FilterInput
                  onChange={(e) => {
                    filters.current = { ...filters.current, name: e.value };
                  }}
                  onEnter={updateUrl}
                  defaultValue={filters.current.name}
                />
              </CollapsableConfig>
              <CollapsableConfig title="Tag">
                <FilterInput
                  onChange={(e) => {
                    const val = e.value.trim();
                    if (val) {
                      if (filters.current.tags) {
                        filters.current.tags.add(val);
                      } else {
                        filters.current = {
                          ...filters.current,
                          tags: new Set(val),
                        };
                      }
                    }
                  }}
                  onEnter={() => {
                    updateUrl();
                  }}
                />
              </CollapsableConfig>
              <button
                className="bg-maroon text-white w-full py-2 rounded-lg"
                onClick={(e) => {
                  updateUrl();
                }}
                type={"submit"}
              >
                Submit
              </button>
            </form>
          </div>

          <div className="grow py-3 px-5">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <h3>3 results (0.12 seconds)</h3>
            {/*<EventList events={results} />*/}
          </div>
        </div>
      </div>
    </div>
  );
}
