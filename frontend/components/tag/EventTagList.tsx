import React from "react";
import TagDisplay from "@/components/tag/TagDisplay";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 my-1">
      {tags.map((tag) => (
        <TagDisplay text={tag} key={tag}></TagDisplay>
      ))}
    </div>
  );
}
