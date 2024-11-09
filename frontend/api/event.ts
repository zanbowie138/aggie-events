import { fetchUtil } from "@/api/fetch";
import { Event } from "@/config/dbtypes";
import { EventCreate, EventPageInformation } from "@/config/query-types";

export const searchEvents = async (query: string | null): Promise<Event[]> => {
  try {
    // TODO: Implement pages for search results
    // If there is a query, search for events with that query
    // Otherwise, return all events
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}` + `/search?query=${query}`,
      {
        method: "GET",
      },
    );
    return response.json() ?? [];
  } catch (error) {
    throw new Error("Error searching events" + error);
  }
};

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/events`,
      {
        method: "GET",
      },
    );
    return response.json() ?? [];
  } catch (error) {
    throw new Error("Error fetching events");
  }
};

export const fetchEventById = async (
  eventID: number,
): Promise<EventPageInformation> => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${eventID}`,
      {
        method: "GET",
      },
    );
    return response.json() ?? null;
  } catch (error) {
    throw new Error("Error fetching event");
  }
};

export const createEvent = async (event: EventCreate) => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/events`,
      {
        method: "POST",
        body: event,
      },
    );
    return response.json() ?? null;
  } catch (error) {
    throw new Error("Error creating event");
  }
};
