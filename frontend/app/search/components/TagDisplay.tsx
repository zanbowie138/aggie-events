import React from "react";
import { IoClose } from "react-icons/io5";

export default function TagDisplay({ text }: { text: string }) {
  const onClose = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tags = searchParams.getAll("tag");
    searchParams.delete("tag", text);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  };

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
