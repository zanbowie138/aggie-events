export interface EventPageInformation {
  event_id: number;
  event_name: string;
  event_description: string | null;
  event_location: string | null;
  event_likes: number;
  start_time: Date;
  end_time: Date;
  date_created: Date;
  date_modified: Date;
  contributor_name: string;
  org_name: string | null;
  org_id: number | null;
  tags: string[];
}

export interface EventCreate {
  event_name: string;
  event_description: string | null;
  event_location: string | null;
  start_time: Date;
  end_time: Date;
  tags: string[];
}

// TODO: Add general query type
export type SearchFilters = {
  name?: string;
  tags?: Set<string>;
  dateRange?: Date[];
  location?: string;
  page?: number;
  organizations?: string[];
};

// Set a filter in the filters object
// This is a function because typescript shenanigans
export function setFilterParam<T extends keyof SearchFilters>(
  filters: SearchFilters,
  key: T,
  value: SearchFilters[T],
) {
  filters[key] = value;
}
