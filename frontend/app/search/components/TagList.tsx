import React from "react";
import TagDisplay from "@/app/search/components/TagDisplay";
import { useEffect, useState } from "react";

export default function TagList({ tags }: { tags: string[] }) {
  const [myTags, setTags] = useState(tags);

  useEffect(() => {
    setTags(tags);
  }, [tags]);

  useEffect(() => {
    const handlePopState = () => {
      // Trigger a re-render by updating state or any other method
      let newTags = new URLSearchParams(window.location.search).getAll("tag");
      setTags(newTags);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-1 m-2">
      {myTags.map((tag) => (
        <TagDisplay text={tag} key={tag}></TagDisplay>
      ))}
    </div>
  );
}
