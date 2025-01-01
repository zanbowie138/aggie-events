import React, { useEffect } from "react";
import useTagInput from "@/app/hooks/useTagInput";
import TagDisplay from "@/app/search/components/TagDisplay";

interface TagInputProps {
  onTagChange: (tags: string[]) => void;
}


export default function TagInput({ onTagChange }: TagInputProps) {
  const { tags, handleAddTag, handleRemoveTag } = useTagInput(10);

  useEffect(() => {
    onTagChange(tags);
  }, [tags]);

  return (
    <div className="flex flex-col w-[700px] gap-1">
      <input
        type="text"
        placeholder="Add a tag (enter to add, backspace to remove)"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTag(e.currentTarget.value);
            e.currentTarget.value = "";
          } else if (e.key === "Backspace" && e.currentTarget.value === "") {
            handleRemoveTag(tags[tags.length - 1]);
          }
        }}
        className="border border-gray-300 bg-gray-100 p-1 rounded"
      />
      <div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <TagDisplay text={tag} key={tag} onClose={() => handleRemoveTag(tag)} />
          ))}
        </div>
      </div>
    </div>
  )
}