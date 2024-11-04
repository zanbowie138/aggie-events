import { fetchUtil } from '@/api/fetch';

export interface Event {
    event_id: number;
    contributer_id: number;
    event_name: string;
    event_description: string;
    event_likes: number;
    event_location: string;
    start_time: Date;
    end_time: Date;
    date_created: Date;
    date_modified: Date;
}

export const searchEvents = async (query: string): Promise<Event[]> => {
    try {
        const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`, {
            method: 'GET',
        });
        return response.json() ?? [];
    } catch (error) {
        throw new Error('Error searching events' + error);
    }
}