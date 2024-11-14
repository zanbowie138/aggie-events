import { db } from "../../database";
import express from "express";

export const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
  console.log(req.query);
  const { query: queryString } = req.query;

  // if (!query) {
  //   res.status(400).json({ message: "Query parameter required" });
  //   return;
  // }

  try {
    // TODO: check for typos
    let query = db
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
      ]);

    if (queryString != null) {
      console.log("Searching for events with query: ", queryString);
      query = query.where("event_name", "ilike", `%${queryString}%`);
    } else {
      console.log("Searching for all events");
    }

    const results = await query.execute();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: "Error searching events" });
  }
});
