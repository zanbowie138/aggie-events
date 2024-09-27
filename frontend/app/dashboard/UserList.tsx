"use client"
import React, { useEffect, useState } from "react";

export interface User {
    user_email: string;
    user_id: number;
    user_mod: boolean;
    user_name: string;
  }

export default function UserList({ update = false }: { update: boolean }) {
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        const fetchUsernames = async (): Promise<void> => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
            if (!apiUrl) {
                console.error('API URL is not defined');
                return;
            }
        
            try {
                const response = await fetch(`${apiUrl}/users`, { credentials: 'include' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const usersData = await response.json();
                console.log('Users:', usersData);
                setUsers(usersData ?? []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        console.log("Fetching users...");
        fetchUsernames();
    }, [update]);

    return (
        <>
            <div className="my-3">
                <h2 className="text-xl font-bold">All users: </h2>
                <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Mod</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{user.user_name}</td>
                            <td className="py-2 px-4 border-b">{user.user_email}</td>
                            <td className="py-2 px-4 border-b">{user.user_mod.toString()}</td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            </div>
        </>
    );
}