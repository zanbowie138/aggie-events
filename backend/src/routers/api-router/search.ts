import { db } from "../../database";
import express from "express";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
  console.log(req.query);
  const { query: queryString, tags: tags, name: name } = req.query;

  try {
    // TODO: check for typos
    let query = db.selectFrom("events as e");

    if (queryString) {
      query = query.where("e.event_name", "ilike", `%${queryString}%`);
    }

    if (name) {
      query = query.where("e.event_name", "ilike", `%${name}%`);
    }
    query = query.select((eb) => [
      "e.event_id",
      "e.event_name",
      "e.event_description",
      "e.event_likes",
      "e.start_time",
      "e.end_time",
      "e.date_created",
      "e.date_modified",
      // TODO: Maybe just return a regular array
      jsonArrayFrom(
        // Subquery that selects tags for each event and puts it in a json array
        eb
          .selectFrom("eventtags as e_t")
          .whereRef("e_t.event_id", "=", "e.event_id")
          .innerJoin("tags as t", "e_t.tag_id", "t.tag_id")
          .select(["t.tag_name as tag_name"]),
      ).as("tags"),
    ]);
    const results = await query.execute();
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: "Error searching events" });
  }
});
