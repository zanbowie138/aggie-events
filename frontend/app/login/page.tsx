'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface User {
    displayName: string;
    email: string;
    picture: string;
    // add other properties if needed
}

export default function Login() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/user`, { credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
            if (!data.displayName) {
                setUser(null)
            } else {
                setUser(data)
                console.log(data)
            }
        })
        .catch((error) => console.error('Error:', error));
    }, [])

    async function logout() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/logout`, { method: 'POST', credentials: 'include' })
            if (response.ok) {
                setUser(null)
            } else {
                console.error('Failed to log out:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }


    return (
        <>
            <h1 className="text-3xl my-4">User Page</h1>
            <button onClick={() => {window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/google`;}}
                className="bg-blue-400 p-4 m-2 rounded-md">
                Log in with Google
            </button>

            <button onClick={logout}
                className="bg-red-400 p-4 m-2 rounded-md">
                Log out
            </button>

            {user && (<>
                <h2>Welcome, {user.displayName}!</h2>
                <h2>Email: {user.email}</h2>
                <Image src={user.picture} width={200} height={200} alt="User Picture" /></>
                )}
        </>
    )
}
