import ToastManager from '@/components/toast/ToastManager';
import { fetchUtil } from '@/api/fetch';
import Toast from '@/components/toast/Toast';

export interface User {
  user_email: string;
  user_id: number;
  user_mod: boolean;
  user_name: string;
}

export const addUser = async (username: string, email: string) => {
  try {
<<<<<<< HEAD
    const response = await fetchUtil(`${process.env.API_URL}/users`, {
=======
    const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
>>>>>>> main
      method: 'POST',
      body: { username, email },
    });
    console.log('User added successfully', response);
  } catch (error) {
    throw new Error('Error adding user');
  }
};

export const fetchUsernames = async (): Promise<User[]> => {
  try {
<<<<<<< HEAD
    const response = await fetchUtil(`${process.env.API_URL}/users`, {
=======
    const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
>>>>>>> main
      method: 'GET',
    });
    return response.json() ?? [];
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const deleteUser = async () => {
  try {
<<<<<<< HEAD
    const response = await fetchUtil(`${process.env.API_URL}/users`, {
=======
    const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
>>>>>>> main
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Error deleting users');
  }
};