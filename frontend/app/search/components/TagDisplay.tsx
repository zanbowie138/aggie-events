import React from "react";
import { IoClose } from "react-icons/io5";

export default function TagDisplay({ text }: { text: string }) {
  return (
    <div className="bg-maroon rounded-md py-1 px-2 text-sm text-white flex items-center font-semibold gap-1 w-max">
      <div>{text}</div>
      <IoClose />
    </div>
  );
}
