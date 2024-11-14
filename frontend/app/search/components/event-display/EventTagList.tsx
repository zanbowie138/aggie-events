import React from "react";
import TagDisplay from "@/app/search/components/event-display/TagDisplay";

export default function TagList() {
  return (
    <div className="flex flex-wrap gap-1 my-1">
      <TagDisplay text="Engineering"></TagDisplay>
      <TagDisplay text="Engineering"></TagDisplay>
      <TagDisplay text="Engineering"></TagDisplay>
      <TagDisplay text="Engineering"></TagDisplay>
      <TagDisplay text="Engineering"></TagDisplay>
    </div>
  );
}
