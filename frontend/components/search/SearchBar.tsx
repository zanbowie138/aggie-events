"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const searchParams = useSearchParams();
  const [focused, setFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocused(false);
      }
    };

    // Add event listener when the menu is open
    if (focused) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      inputRef.current?.blur();
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [focused]);

  return (
    <>
      <form
        className={`flex grow justify-center hover:drop-shadow-lg ${focused && "z-[999]"}`}
        ref={searchRef}
      >
        <input
          id="search-input"
          alt="Test"
          className="text-black bg-gray-100 rounded-l-md px-2 py-1 max-w-[700px]
            w-full h-10 outline-none"
          placeholder="Search..."
          ref={inputRef}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
            if (e.key === "Escape") {
              setFocused(false);
            }
          }}
          onClick={() => setFocused(true)}
        />
        <button
          className="bg-maroon rounded-r-md py-2 px-3"
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
            // TODO: fix this to update the tags on the first popstate
          }}
        >
          <FaSearch color="white" />
        </button>
      </form>
      {focused && (
        <div className="fixed h-screen w-screen bg-black/20 top-0 left-0 z-[998]"></div>
      )}
    </>
  );
}
