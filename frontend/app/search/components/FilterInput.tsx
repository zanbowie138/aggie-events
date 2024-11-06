import React from "react";

export default function FilterInput({ onChange, onEnter }: { onChange: (value: HTMLInputElement) => void, onEnter: () => void }) {
  return (
    <input
      type="text"
      className="w-full p-1 border border-gray-300 outline-none focus:shadow-md ring-1 ring-black"
      onChange={(e) => onChange(e.target)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // prevent the page from refreshing (default behaviour for inputs)
          onEnter();
        }
      }}
    />
  );
}
