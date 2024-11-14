import React, { useRef, useState } from "react";
import CollapsableConfig from "@/app/search/components/CollapsableConfig";
import FilterInput from "@/app/search/components/FilterInput";
import { SearchFilters } from "@/config/query-types";

export type FilterListOutput = {
  name?: string;
  tag?: string;
};

export default function FilterList({
  onSubmit,
}: {
  onSubmit: (filters: FilterListOutput) => void;
}) {
  const [filters, setFilters] = useState<FilterListOutput>({
    name: "",
    tag: "",
  });
  // const filters = useRef<FilterListOutput>({
  //   name: "",
  //   tag: "",
  // });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(filters);
        // filters.current = {};
      }}
    >
      <CollapsableConfig title="Name">
        <FilterInput
          onChange={(e: HTMLInputElement) => {
            setFilters({ ...filters, name: e.value });
          }}
          value={filters.name}
        />
      </CollapsableConfig>
      <CollapsableConfig title="Tag">
        <FilterInput
          onChange={(e: HTMLInputElement) => {
            setFilters({ ...filters, tag: e.value });
          }}
          value={filters.tag}
        />
      </CollapsableConfig>
      <button
        className="bg-maroon text-white w-full py-2 rounded-lg"
        type={"submit"}
      >
        Submit
      </button>
    </form>
  );
}
