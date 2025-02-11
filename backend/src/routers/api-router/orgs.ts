/**
 * Organization Router module for handling organization-related API routes.
 * @module routers/api-router/orgs
 */

import { authMiddleware } from "../../middlewares/authMiddleware";
import { db } from "../../database";
import express from "express";

export const orgRouter = express.Router();

/**
 * Route to create a new organization.
 * @name post/
 * @function
 * @memberof module:routers/api-router/orgs
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.username - The name of the organization.
 * @param {string} req.body.email - The email of the organization.
 * @param {Object} res - The response object.
 * @returns {string} A message indicating the organization creation status.
 */
orgRouter.post("/", authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  console.log("Post user req.user: " + req.user);
  try {
    await db
      .insertInto("orgs")
      .values({ org_name: username, org_email: email })
      .execute();
    res.send("Org created!");
  } catch (error) {
    console.error("Error creating org:", error);
    res.status(500).send("Error creating org!");
  }
});

/**
 * Route to fetch all organizations.
 * @name get/
 * @function
 * @memberof module:routers/api-router/orgs
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} JSON array containing all organizations.
 */
orgRouter.get("/", async (req, res) => {
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

/**
 * Route to delete all organizations.
 * @name delete/
 * @function
 * @memberof module:routers/api-router/orgs
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {string} A message indicating the organization deletion status.
 */
orgRouter.delete("/", authMiddleware, async (req, res) => {
  try {
    await db.deleteFrom("orgs").execute();
    res.send("Orgs deleted!");
  } catch (error) {
    console.error("Error deleting Orgs:", error);
    res.status(500).send("Error deleting users!");
  }
});
