import React from "react";

export default function FilterInput({ onChange }: { onChange: (value: HTMLInputElement) => void }) {
  return (
    <input
      type="text"
      className="w-full p-1 border border-gray-300 outline-none focus:shadow-md ring-1 ring-black"
      onChange={(e) => onChange(e.target)}
    />
  );
}
