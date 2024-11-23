import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchPrompt({
  prompt,
  onClick,
}: {
  prompt: string;
  onClick: () => void;
}) {
  return (
    <>
      {prompt.length > 0 && (
        <div className="absolute bg-white top-full left-0 w-full p-2 rounded-b-md">
          <button
            className="flex items-center bg-white hover:bg-gray-200 w-full rounded-md p-1"
            onClick={onClick}
          >
            <FaSearch className="text-gray-700 mx-2 mt-1" size={13} />
            <div className="text-black grow text-left">{prompt}</div>
            <div className="text-gray-500 text-sm">Search by name...</div>
          </button>
        </div>
      )}
    </>
  );
}
