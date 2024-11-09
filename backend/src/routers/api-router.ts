import express from "express";
import { usersRouter } from "./api-router/users";
import { orgRouter } from "./api-router/orgs";
import { searchRouter } from "./api-router/search";
import { eventRouter } from "./api-router/events";

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

apiRouter.use("/users", usersRouter);
apiRouter.use("/orgs", orgRouter);
apiRouter.use("/search", searchRouter);
apiRouter.use("/events", eventRouter);
