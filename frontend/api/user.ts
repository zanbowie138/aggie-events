import ToastManager from "@/components/toast/ToastManager";
import { fetchUtil } from "@/api/fetch";
import Toast from "@/components/toast/Toast";

export interface User {
  user_email: string;
  user_id: number;
  user_mod: boolean;
  user_name: string;
}

export const addUser = async (username: string, email: string) => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: "POST",
        body: { username, email },
      },
    );
    console.log("User added successfully", response);
  } catch (error) {
    throw new Error("Error adding user: " + error);
  }
};

export const fetchUsernames = async (): Promise<User[]> => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: "GET",
      },
    );
    return response.json() ?? [];
  } catch (error) {
    throw new Error("Error fetching users" + error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    throw new Error("Error deleting users");
  }
};

export const updateUser = async (username: string, email: string) => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: "PUT",
        body: { username, email },
      },
    );
    return response;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

// TODO: wait until update is finished then check or keep checking asynchronously for a bit then return error. Make loading animation while updating backend
// updateResponse is the response from the updateUser function to verify that the user has been updated
export const verifyUserUpdate = async (username: string) => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
  }).catch((error) => {
    throw new Error("Error modifying user: " + error);
  });
  const message = await response.json().then((data) => {
    for (const user of data) {
      console.log(user.user_name);
      if (user.user_name === username) {
        return `User updated successfully to ${username}`;
      }
    }
    return "User not updated!";
  });

  console.log("API Tested: " + message);
  ToastManager.addToast("API Message: " + message, "success", 1000);

  return response.status === 200;
};
