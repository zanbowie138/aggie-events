import React from "react";
import TagDisplay from "@/app/search/components/TagDisplay";
import { useEffect, useState } from "react";

export default function TagList({
  tags,
  onTagClose,
}: {
  tags: string[];
  onTagClose: (tag: string) => void;
}) {
  const [myTags, setTags] = useState(() => tags);
  console.log("Tags: " + tags);
  return (
    <div className="flex flex-wrap gap-1 m-2">
      {myTags.length > 0 &&
        myTags.map((tag) => (
          <TagDisplay
            text={tag}
            key={tag}
            onClose={() => {
              onTagClose(tag);
            }}
          ></TagDisplay>
        ))}
    </div>
  );
}
