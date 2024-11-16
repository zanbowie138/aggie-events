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

    // Filtering by tags
    if (tags) {
      const tagArray = (tags as string).split(",");
      query = query
        .innerJoin("eventtags as e_t", "e.event_id", "e_t.event_id")
        .innerJoin("tags as t", "e_t.tag_id", "t.tag_id")
        .where("t.tag_name", "in", tagArray); // Filter by tags
    }

    query = query
      .innerJoin("users as u", "e.contributor_id", "u.user_id")
      // Join with eventorgs table (for organization id)
      // If event has no organization, e_o.org_id will be null
      .leftJoin("eventorgs as e_o", "e.event_id", "e_o.event_id")
      // Join with orgs table (for organization name)
      // If e_o.org_id is null (from above), org_name will be null
      .leftJoin("orgs as o", "e_o.org_id", "o.org_id")
      .select((eb) => [
        "e.event_id as event_id",
        "e.event_name as event_name",
        "e.event_location as event_location",
        "e.event_description as event_description",
        "e.event_likes as event_likes",
        "e.start_time as start_time",
        "e.end_time as end_time",
        "e.date_created as date_created",
        "e.date_modified as date_modified",
        "u.user_name as contributor_name",
        "o.org_name as org_name",
        "o.org_id as org_id",
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
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: "Error searching events" });
  }
});
