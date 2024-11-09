import { authMiddleware } from "../../middlewares/authMiddleware";
import { db } from "../../database";
import express from "express";

export const orgRouter = express.Router();

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

orgRouter.delete("/", authMiddleware, async (req, res) => {
  try {
    await db.deleteFrom("orgs").execute();
    res.send("Orgs deleted!");
  } catch (error) {
    console.error("Error deleting Orgs:", error);
    res.status(500).send("Error deleting users!");
  }
});
