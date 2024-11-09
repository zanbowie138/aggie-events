"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    setQuery(queryParam);
    document
      .getElementById("search-input")
      ?.setAttribute("value", queryParam ?? "");
  }, []);

  const addSearchParam = () => {
    router.push(`/search` + (query !== null ? `?query=${query}` : "")); // TODO: should I make it not remove all the search params when a new main search term is entered
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <form className="flex grow justify-center hover:drop-shadow-lg">
      <input
        id="search-input"
        alt="Test"
        className="text-black bg-gray-100 rounded-l-md px-2 py-1 max-w-[700px]
            w-full h-10 outline-none
            focus:border-[#202020] focus:border-y-2 focus:border-l-2 peer"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSearchParam();
          }
        }}
      />
      <button
        className="bg-maroon rounded-r-md py-2 px-3
          peer-focus:border-[#202020] peer-focus:border-y-2 peer-focus:border-r-2"
        onClick={(e) => {
          e.preventDefault();
          addSearchParam();
          // TODO: fix this to update the tags on the first popstate
        }}
      >
        <FaSearch color="white" />
      </button>
    </form>
  );
}
