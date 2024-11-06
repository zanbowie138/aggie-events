import express from "express";
import { db } from "../database";
import { authMiddleware } from "../middlewares/authMiddleware";

export const apiRouter = express.Router();

apiRouter.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await db.selectFrom("users").selectAll().execute();
        res.json(users);
        console.log("User requested!");
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users!");
    }
});

apiRouter.get("/auth", async (req, res) => {
    console.log("Get auth req.user: " + req.user);
    if (!req.user) {
        res.status(401).json({ message: "User not logged in" });
    } else {
        res.status(200).json({ message: "User is logged in" });
    }
});

apiRouter.get("/test", async (req, res) => {
    res.status(200).json({ message: "Test successful!" });
});

apiRouter.post("/users", authMiddleware, async (req, res) => {
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

apiRouter.put("/users", authMiddleware, async (req, res) => {
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
})

apiRouter.post('/orgs', authMiddleware, async (req, res) => {
    const { username, email } = req.body
    console.log("Post user req.user: " + req.user)
    try {
        await db.insertInto('orgs').values({ org_name: username, org_email: email }).execute()
        res.send("Org created!")
    } catch (error) {
        console.error('Error creating Org:', error)
        res.status(500).send("Error creating Org!")
    }
})
apiRouter.get('/orgs', authMiddleware, async (req, res) => {
    try {
        const orgs = await db.selectFrom('orgs').selectAll().execute()
        res.json(orgs)
        console.log(orgs)
        console.log("Org requested!")
    } catch (error) {
        console.error('Error fetching Orgs:', error)
        res.status(500).send("Error fetching Orgs!")
    }
})
apiRouter.delete('/orgs', authMiddleware, async (req, res) => {
  try {
      await db.deleteFrom('orgs').execute()
      res.send("Orgs deleted!")
  } catch (error) {
      console.error('Error deleting Orgs:', error)
      res.status(500).send("Error deleting users!")
  }
})

// ************ SEARCH ROUTERS ************
apiRouter.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try { // TODO: check for typos
        const results = await db.selectFrom('events')
            .select(['event_id', 'event_name', 'event_description', 'event_likes', 'start_time', 'end_time', 'date_created', 'date_modified'])
            .where('event_name', 'ilike', `%${query}%`)
            .execute();
        console.log(results);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ message: 'Error searching events' });
    }
});

apiRouter.delete("/users", authMiddleware, async (req, res) => {
    try {
        await db.deleteFrom("users").execute();
        res.send("Users deleted!");
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).send("Error deleting users!");
    }
});
