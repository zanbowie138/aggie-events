import React from "react";
import SoloTagDisplay from "@/components/tag/SoloTagDisplay";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 my-1">
      {tags.map((tag) => (
        <SoloTagDisplay text={tag} key={tag}></SoloTagDisplay>
      ))}
    </div>
  );
}
