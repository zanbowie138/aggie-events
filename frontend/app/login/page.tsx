'use client'
import { useState, useEffect } from 'react'

interface User {
    name: string;
    // add other properties if needed
}

export default function Login() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/user`, { credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
            setUser(data)
            console.log(data)
        })
        .catch((error) => console.error('Error:', error));
    }, [])


    return (
        <>
            <h1 className="text-3xl my-4">User Page</h1>
            <button onClick={() => {window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/google`;}}
                className="bg-blue-400 p-4 rounded-md">
                Log in with Google
            </button>

            {user && <h2>Welcome, {user.name}!</h2>}
        </>
    )
}
