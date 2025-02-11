/**
 * API Router module for handling various API routes.
 * @module routers/api-router
 */

import express from "express";
import { usersRouter } from "./api-router/users";
import { orgRouter } from "./api-router/orgs";
import { searchRouter } from "./api-router/search";
import { eventRouter } from "./api-router/events";
import { tagRouter } from "./api-router/tag";

export const apiRouter = express.Router();

/**
 * Route to check authentication status.
 * @name get/auth
 * @function
 * @memberof module:routers/api-router
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON object with a message indicating the authentication status.
 */
apiRouter.get("/auth", async (req, res) => {
  console.log("Get auth req.user: " + req.user);
  if (!req.user) {
    res.status(401).json({ message: "User not logged in" });
  } else {
    res.status(200).json({ message: "User is logged in" });
  }
});

/**
 * Route to test the API.
 * @name get/test
 * @function
 * @memberof module:routers/api-router
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON object with a message indicating the test status.
 */
apiRouter.get("/test", async (req, res) => {
  res.status(200).json({ message: "Test successful!" });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/orgs", orgRouter);
apiRouter.use("/search", searchRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/tags", tagRouter);
