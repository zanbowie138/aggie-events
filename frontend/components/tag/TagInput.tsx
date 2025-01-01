import React from "react";
import useTagInput from "@/app/hooks/useTagInput";
import SoloTagDisplay from "./SoloTagDisplay";

interface TagInputProps {
  onTagAdd: (tags: string[]) => void;
}

export default function TagInput({ onTagAdd }: TagInputProps) {
  const { tags, handleAddTag, handleRemoveTag } = useTagInput(10, onTagAdd);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add a tag"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div>
        {tags.map((tag) => (
          <SoloTagDisplay text={tag} key={tag} />
        ))}
      </div>
    </div>
  )
}