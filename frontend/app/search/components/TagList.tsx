import React, { useEffect } from "react";
import TagDisplay from "@/app/search/components/TagDisplay";
import { useState } from "react";

export default function TagList({
  tags,
  onTagClose,
}: {
  tags: string[];
  onTagClose: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 m-2">
      {tags.length > 0 &&
        Array.from(tags).map((tag) => (
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
