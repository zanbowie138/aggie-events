import React from "react";

export default function TagDisplay({ text }: { text: string }) {
  return (
    <div
      className="bg-lightmaroon rounded-md py-1 px-1.5
    text-sm text-white flex items-center font-semibold gap-1 w-max hover:shadow-md"
    >
      {text}
    </div>
  );
}
