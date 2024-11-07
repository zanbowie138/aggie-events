import { fetchUtil } from "@/api/fetch";
import { Event } from "@/config/dbtypes";
import { EventPageInformation } from "@/config/query-types";

export const searchEvents = async (query: string): Promise<Event[]> => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`,
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
