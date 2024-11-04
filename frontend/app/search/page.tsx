'use client'
import react, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { searchEvents } from '@/api/event';

export default function SearchPage() {
    const { user } = useAuth();
    const [query, setQuery] = useState<string | undefined>(undefined);
    const [results, setResults] = useState<string[] | undefined>(undefined);

    const handleSearch = async () => {
        const response = await searchEvents(query!);
        console.log("Search button clicked!" + response[0]);
    }


    return (
        <>
            <h1 className="text-3xl my-4">Search Page</h1>
            <p>Search for something here!</p>
            <input
                type="text"
                placeholder="Search"
                className="border p-2 m-2"
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-400 p-4 m-2 rounded-md" onClick={() => handleSearch()}>Search</button>
        </>
    )
}