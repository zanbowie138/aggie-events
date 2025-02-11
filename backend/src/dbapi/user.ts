/**
 * Module for interacting with the users table in the database.
 * @module dbapi/user
 */

import { db } from "../database";
import { Users } from "../types/dbtypes";
import { UserStorage } from "../types/customtypes";

/**
 * Fetches a user by their user ID.
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<Users>} A promise that resolves to the user object.
 * @throws {Error} If there is an error fetching the user.
 */
export async function getUserById(userId: number): Promise<Users> {
  try {
    return await db
      .selectFrom("users")
      .where("user_id", "=", userId)
      .select(["user_email", "user_name"])
      .executeTakeFirstOrThrow();
  } catch (error) {
    throw new Error("Error fetching user!");
  }
}
