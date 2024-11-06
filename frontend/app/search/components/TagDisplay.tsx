import React from "react";
import { IoClose } from "react-icons/io5";

export default function TagDisplay({ text }: { text: string }) {
  const onClose = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tags = searchParams.getAll("tag");
    searchParams.delete("tag", text);
    window.location.search = searchParams.toString();
  };

  return (
    <div className="bg-maroon rounded-md py-1 px-2 text-sm text-white flex items-center font-semibold gap-1 w-max">
      <div>{text}</div>
      <IoClose onClick={onClose} />
    </div>
  );
}
