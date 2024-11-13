"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const searchParams = useSearchParams();
  const { push } = useRouter();

  function handleSearch() {
    // Manipulate url query parameters
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("query", searchInput);
    } else {
      params.delete("query");
    }
    push(`/search?${params.toString()}`);
  }

  return (
    <form className="flex grow justify-center hover:drop-shadow-lg">
      <input
        id="search-input"
        alt="Test"
        className="text-black bg-gray-100 rounded-l-md px-2 py-1 max-w-[700px]
            w-full h-10 outline-none
            focus:border-[#202020] focus:border-y-2 focus:border-l-2 peer"
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <button
        className="bg-maroon rounded-r-md py-2 px-3
          peer-focus:border-[#202020] peer-focus:border-y-2 peer-focus:border-r-2"
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
          // TODO: fix this to update the tags on the first popstate
        }}
      >
        <FaSearch color="white" />
      </button>
    </form>
  );
}
