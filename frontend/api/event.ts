import { fetchUtil } from '@/api/fetch';
import { Event } from '@/app/search/components/EventDisplay';

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