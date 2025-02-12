// This type is used to represent req.user in the router handlers.
// Every request, if the user is authenticated, this type will be included in req.user
export interface UserStorage {
  user_email: string;
  user_name: string;
  picture: string;
  user_id: number;
}

// This is how the users are stored in session storage
export interface SerializedUser {
  user_id: number;
  picture: string;
}
