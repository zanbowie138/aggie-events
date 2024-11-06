import React from "react";
import TagDisplay from "@/app/search/components/TagDisplay";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 m-2">
      {tags.map((tag) => (
        <TagDisplay text={tag} key={tag}></TagDisplay>
      ))}
    </div>
  );
}
