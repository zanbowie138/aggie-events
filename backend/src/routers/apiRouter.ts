import express from "express";
import { db } from "../database";
import { authMiddleware } from "../middlewares/authMiddleware";

export const apiRouter = express.Router();

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

// ************ USER ROUTERS ************

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

// ************ ORG ROUTERS ************
apiRouter.post("/orgs", authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  console.log("Post user req.user: " + req.user);
  try {
    await db
      .insertInto("orgs")
      .values({ org_name: username, org_email: email })
      .execute();
    res.send("Org created!");
  } catch (error) {
    console.error("Error creating Org:", error);
    res.status(500).send("Error creating Org!");
  }
});

apiRouter.get("/orgs", async (req, res) => {
  try {
    const orgs = await db.selectFrom("orgs").selectAll().execute();
    res.json(orgs);
    console.log(orgs);
    console.log("Org requested!");
  } catch (error) {
    console.error("Error fetching Orgs:", error);
    res.status(500).send("Error fetching Orgs!");
  }
});
apiRouter.delete("/orgs", authMiddleware, async (req, res) => {
  try {
    await db.deleteFrom("orgs").execute();
    res.send("Orgs deleted!");
  } catch (error) {
    console.error("Error deleting Orgs:", error);
    res.status(500).send("Error deleting users!");
  }
});

// ************ SEARCH ROUTERS ************
apiRouter.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // TODO: check for typos
    const results = await db
      .selectFrom("events")
      .select([
        "event_id",
        "event_name",
        "event_description",
        "event_likes",
        "start_time",
        "end_time",
        "date_created",
        "date_modified",
      ])
      .where("event_name", "ilike", `%${query}%`)
      .execute();
    console.log(results);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: "Error searching events" });
  }
});

// ************ EVENT ROUTERS ************
apiRouter.get("/events", async (req, res) => {
  try {
    const events = await db.selectFrom("events").selectAll().execute();
    res.json(events);
    console.log("Events requested!");
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Error fetching events!");
  }
});

interface EventPageInformation {
  event_id: number;
  event_name: string;
  event_description: string | null;
  event_location: string | null;
  event_likes: number;
  start_time: Date;
  end_time: Date;
  date_created: Date;
  date_modified: Date;
  contributor_name: string;
  org_name: string | null;
  org_id: number | null;
  tags: string[];
}

// Returns all information needed for event page
apiRouter.get("/events/:event_id", async (req, res) => {
  const event_id: number = parseInt(req.params.event_id, 10);
  try {
    const page_data = await db
      .selectFrom("events as e")
      .where("e.event_id", "=", event_id)
      // Join with users table (for contributor name)
      .innerJoin("users as u", "e.contributor_id", "u.user_id")
      // Join with eventorgs table (for organization id)
      // If event has no organization, e_o.org_id will be null
      .leftJoin("eventorgs as e_o", "e.event_id", "e_o.event_id")
      // Join with orgs table (for organization name)
      // If e_o.org_id is null (from above), org_name will be null
      .leftJoin("orgs as o", "e_o.org_id", "o.org_id")
      .select([
        "e.event_id as event_id",
        "e.event_name as event_name",
        "e.event_description as event_description",
        "e.event_location as event_location",
        "e.event_likes as event_likes",
        "e.start_time as start_time",
        "e.end_time as end_time",
        "e.date_created as date_created",
        "e.date_modified as date_modified",
        "u.user_name as contributor_name",
        "o.org_name as org_name",
        "o.org_id as org_id",
      ])
      // Execute the query and return the first result
      // If no results are found, throw an error
      .executeTakeFirstOrThrow()
      .then((event) => {
        return event;
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        res.status(404).json({ message: "Event not found" });
      });

    if (!page_data) {
      return;
    }

    const tags = await db
      .selectFrom("eventtags as e_t")
      .where("e_t.event_id", "=", page_data.event_id)
      .innerJoin("tags as t", "e_t.tag_id", "t.tag_id")
      .select(["t.tag_name as tag_name"])
      .execute()
      .then((tags) => {
        return tags.map((tag) => tag.tag_name);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        res.status(404).json({ message: "Error fetching tags" });
      });

    res.json({ ...page_data, tags } as EventPageInformation);
    console.log("Event requested!");
    console.log("Tags: " + tags);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send("Error fetching event!");
  }
});
