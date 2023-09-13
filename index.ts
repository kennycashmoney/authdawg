import express from "express";
import bodyParser from "body-parser";
const db = require("./models");  // I can't figure out how to import in ts syntax
const app = express();

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

/**
 * API endpoints
 */

/** Service to create a new user */
app.post("/v1/createNewUser", async (req, res) => {
  const { username, password } = req.body;

  // validate the username doesn't already exist
  const userExists = await db.User.findOne({ where: { username } });
  if (!userExists) {
    db.User.create({ username, password })
      .then(() => res.sendStatus(201))
      .catch((error: any) => {
        res.status(500).send(error);
      });
  } else {
    console.log("Username already exists");
    res.status(400).send({ msg: "Username already exists" });
  }

  /** Service to authenticate a user's credentials for log-in */
  app.get("/v1/authenticateUser", async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (user && user.password === password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
