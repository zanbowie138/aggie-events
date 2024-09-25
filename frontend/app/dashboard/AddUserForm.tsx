"use client";
import { useEffect, useState } from "react"
import UserList from "./UserList"

export default function AddUserForm() {
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
    });
    setUpdate(!update)
  }

  return (<>
    <div className="bg-gray-200 rounded-lg p-4 my-3">
      <form className="mx-3">
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
        <button onClick={() => { addUser(username, email) }}
          className="bg-blue-500 rounded-md px-2 py-1">
          Create user
        </button>
      </form>
      <div className="mx-3 w-2/5">
        <UserList update={update} />
      </div>
    </div>
  </>);
}