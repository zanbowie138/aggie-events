"use client";
import { useEffect, useState } from "react"
import UserList from "./UserList"
import { useAuth } from '@/components/auth/AuthContext'
import ToastManager from '@/components/toast/ToastManager'
import Toast from "@/components/toast/Toast";

export default function AddUserForm() {
  const { user } = useAuth()
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [update, setUpdate] = useState<boolean>(false);

  const addUser = async (username: string, email: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, email: email })
    }).then((response) => {
      if (response.ok) {
        console.log('User added successfully');
        ToastManager.addToast('User added successfully', 'success', 1000)
        setUpdate(!update)
      } else {
        ToastManager.addToast('Failed to add user', 'error', 1000)
        console.error('Failed to add user');
      }
    }).catch((error) => {
      ToastManager.addToast('Server Error', 'error', 1000)
      console.error('Error adding user:', error);
    });
  }

  const deleteUser = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        console.log('Users deleted successfully');
        ToastManager.addToast('Users deleted successfully', 'success', 1000)
        setUpdate(!update)
      } else {
        ToastManager.addToast('Failed to delete users', 'error', 1000)
        console.error('Failed to delete users');
      }
    }).catch((error) => {
      ToastManager.addToast('Server Error', 'error', 1000)
      console.error('Error deleting users:', error);
    });
  }

  return (<>
    {/* {user?  */}
    {/* ( */}
    <div className="bg-gray-200 rounded-lg p-4 my-3">
      <input type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="border border-gray-300 bg-gray-100 p-1 rounded mr-2"
      />
      <input
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 bg-gray-100 p-1 rounded mr-2"
      />
      <button onClick={() => {
        addUser(username, email)
      }}
        className="bg-blue-500 rounded-md px-2 py-1">
        Create user
      </button>
      <div className="my-2">
        <button className="bg-red-400 rounded-md px-2 py-1" onClick={deleteUser}>
          Delete users
        </button>
      </div>
      <div className="mx-3 w-2/5">
        <UserList update={update} />
      </div>
    </div>
    {/* ):(
      // <h1 className="text-xl my-4">Please log in to see the dashboard.</h1>
      // )}*/}
  </>);
}