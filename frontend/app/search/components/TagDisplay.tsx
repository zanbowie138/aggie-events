import React from "react";
import { IoClose } from "react-icons/io5";

export default function TagDisplay({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  return (
    <button
      className="bg-maroon rounded-md py-1 px-2 text-sm text-white flex items-center font-semibold gap-1 w-max"
      onClick={onClose}
    >
      <div>{text}</div>
      <IoClose />
    </button>
  );
}
