import { authMiddleware } from "../../middlewares/authMiddleware";
import { db } from "../../database";
import express from "express";

export const usersRouter = express.Router();

usersRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await db.selectFrom("users").selectAll().execute();
    res.json(users);
    console.log("User requested!");
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users!");
  }
});

usersRouter.post("/", authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  console.log("Post user req.user: " + req.user);
  try {
    await db
      .insertInto("users")
      .values({ user_name: username, user_email: email })
      .execute();
    res.send("User created!");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user!");
  }
});

usersRouter.put("/", authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  try {
    await db
      .updateTable("users")
      .set("user_name", username)
      .where("user_email", "=", email)
      .execute();
    res.send(username + "");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user!");
  }
});

usersRouter.delete("/", authMiddleware, async (req, res) => {
  try {
    await db.deleteFrom("users").execute();
    res.send("Users deleted!");
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).send("Error deleting users!");
  }
});
