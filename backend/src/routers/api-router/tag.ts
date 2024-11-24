import { authMiddleware } from "../../middlewares/authMiddleware";
import { db } from "../../database";
import express from "express";
import { usersRouter } from "./users";

export const tagRouter = express.Router();

tagRouter.get("/search", async (req, res) => {
  console.log(req.query);
  const { query: queryString } = req.query;
  try {
    const tags = await db
      .selectFrom("tags as t")
      .where("t.tag_name", "ilike", `%${queryString}%`)
      .orderBy("t.tag_id", "asc")
      .select("t.tag_name")
      .limit(5)
      .execute();
    res.json(tags);
    console.log("Tags requested!");
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).send("Error fetching tags!");
  }
});
