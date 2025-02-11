/**
 * Tag Router module for handling tag-related API routes.
 * @module routers/api-router/tag
 */

import { authMiddleware } from "../../middlewares/authMiddleware";
import { db } from "../../database";
import express from "express";
import { usersRouter } from "./users";

export const tagRouter = express.Router();

/**
 * Route to search for tags based on query parameters.
 * @name get/search
 * @function
 * @memberof module:routers/api-router/tag
 * @param {Object} req - The request object.
 * @param {string} req.query.query - The search query string.
 * @param {Object} res - The response object.
 * @returns {Object} JSON object containing the search results.
 */
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
