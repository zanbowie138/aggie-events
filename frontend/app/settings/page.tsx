"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { updateUser } from '@/api/user';
import { useAuth } from '@/components/auth/AuthContext';
import ToastManager from '@/components/toast/ToastManager';
import AuthSuspense from '@/components/auth/AuthSuspense';

// TODOLIST:
// - Add a loading spinner while updating the user or other items
// - abstract these update functions, update confirmations, and loading
// - use built in react suspense component
// - input validation
// - duplicate username checking
// - rate limiting

export default function() {
    const { user } = useAuth();
    const [username, setUsername] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (user){
            setUsername(user.user_name);
        }
    }, []);

    const handleUpdate = async () => {
        if (user) {
            try{
                let response = await updateUser(username!, user.user_email);
                if (response.body){
                    const message = await "Successfully updated username to " + await response.text();
                    await ToastManager.addToast(message, 'success', 1000);
                } else {
                    const message = "Error updating username!";
                    ToastManager.addToast(message, 'error', 1000);
                }
            } catch (error) {
                console.error('Error updating user:', error);
                const message = "Error updating username!";
                ToastManager.addToast(message, 'error', 1000);
            }
        } else {
            console.error("User is not authenticated");
        }
    };

    return (
            <>
                <AuthSuspense>
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
                    </div>
                </AuthSuspense>
            </>
    );
};