import { fetchUtil } from '@/api/fetch';
import { Event } from '@/config/dbtypes';

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


// export const getEventTags = async (event_id: number): Promise<string[]> => {
//     try {
//         const IDs = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/events/${event_id}/tags`, {
//             method: 'GET',
//         }); // NOTE: currently working on making the event tags populate with the actual db data

//         const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
//             method: 'GET',
//             body: JSON.stringify({ query }),
//         });
//         return response.json() ?? [];
//     } catch (error) {
//         throw new Error('Error getting event tags' + error);
//     }
// }