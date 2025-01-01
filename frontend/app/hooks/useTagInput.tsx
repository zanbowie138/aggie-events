import React, { useState } from "react";

// hook to track tags
export default function useTagInput(maxTags = 5, onTagAdd: (tags: string[]) => void) {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      setTags([...tags, newTag]);
      onTagAdd(tags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return { tags, handleAddTag, handleRemoveTag };
}
