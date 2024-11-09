import { db } from "../../database";
import express from "express";

export const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
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
