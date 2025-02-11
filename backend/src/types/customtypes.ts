// This type is used to represent req.user in the router handlers.
export interface UserStorage {
  user_email: string;
  user_name: string;
  picture: string;
  user_id: number;
}

export interface SerializedUser {
  user_id: number;
  picture: string;
}
