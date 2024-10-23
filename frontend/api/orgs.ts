import ToastManager from '@/components/toast/ToastManager';
import { fetchUtil } from '@/api/fetch';
import Toast from '@/components/toast/Toast';

export interface Organization {
  user_email: string;
  user_id: number;
  user_mod: boolean;
  user_name: string;
}

export const addOrganization = async (username: string, email: string) => {
  try {
    const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/orgs`, {
      method: 'POST',
      body: { username, email },
    });
    console.log('Organization added successfully', response);
  } catch (error) {
    throw new Error('Error adding Organization');
  }
};

export const fetchOrganization = async (): Promise<Organization[]> => {
  try {
    const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/orgs`, {
      method: 'GET',
    });
    return response.json() ?? [];
  } catch (error) {
    throw new Error('Error fetching Organization');
  }
};

export const deleteOrganization = async () => {
  try {
    const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/orgs`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Error deleting Organization');
  }
};