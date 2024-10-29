"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { updateUser, verifyUserUpdate } from '@/api/user';
import { useAuth } from '@/components/auth/AuthContext';
import AuthRedirect from '@/components/auth/AuthRedirect';
import ToastManager from '@/components/toast/ToastManager';
import Toast from '@/components/toast/Toast';


export default function() {
    const { user, logout } = useAuth();
    const [username, setUsername] = useState<string | undefined>(undefined);
    if (!user) {
        // redirect to login page
        AuthRedirect({ url: '/login' });
        return null;
    }
    useEffect(() => {
        if (user){
            setUsername(user.user_name);
        }
    }, []);

    const handleUpdate = () => {
        if (user) {
            updateUser(username!, user.user_email);
            verifyUserUpdate(username!);
        } else {
            console.error("User is not authenticated");
        }
    };

    return (
            <>
                {!user ? <div>
                    <p>loading...</p>
                </div> :
                <div>
                    <div className='border p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto mt-10'>
                        <h1 className='text-2xl font-extrabold mb-4'>Settings Page</h1>
                        <p className='mb-4'>Welcome to the settings page!</p>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Update Username:</label>
                            <input
                                type="text"
                                placeholder="Enter new username"
                                onChange={(e) => setUsername(e.target.value)}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <button
                            onClick={handleUpdate}
                            className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                            Update
                        </button>
                    </div>
                </div>}
            </>
    );
};