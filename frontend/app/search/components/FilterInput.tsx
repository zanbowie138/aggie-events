import React from "react";

type FilterInputProps = {
  onChange: (value: HTMLInputElement) => void;
  onEnter: () => void;
  defaultValue?: string;
};

export default function FilterInput({
  onChange,
  onEnter,
  defaultValue,
}: FilterInputProps) {
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
      defaultValue={defaultValue}
    />
  );
}
