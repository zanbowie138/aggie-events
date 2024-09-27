"use client"
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface User {
    user_name: string;
    user_email: string;
    picture: string;
    // add other properties if needed
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        const fetchUser = async () => fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/user`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data:", data)
                if (!data.user_email) {
                    console.log('No user logged in')
                    setUser(null)
                } else {
                    setUser(data)
                    console.log("Auth context: " + JSON.stringify(data))
                }
            })
            .catch((error) => console.error('Error checking user authentication:', error));
        fetchUser()
    }, [])

    async function logout() {
        fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/logout`, { method: 'POST', credentials: 'include' })
            .then((response) => {
                if (response.ok) { setUser(null) }
                else { console.error('Failed to log out:', response.statusText) }
            }
            )
            .catch((error) => console.error('Error logging out:', error))
    }
    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}