const express = require("express");
const router = express.Router();

/**
 * API endpoints
 */

// Service to create a new user
router.post("/createNewUser", async (req, res) => {
    // TODO: figure out how to catch encrypted credentials
    // console.log(req);
    console.log("Request to create new user...");
    // console.log(`Request body: ${JSON.stringify(req.body)}`);
    // console.log(`Request header credentials: ${JSON.stringify(req.headers.authorization)}`);
    const { username, password } = req.body;
  
    // validate the username doesn't already exist
    const userExists = await db.User.findOne({ where: { username } });
    if (!userExists) {
      db.User.create({ username, password })
        .then((user) => res.sendStatus(201))
        .catch((error) => {
          res.status(500).send(error);
        });
    } else {
      console.log("Username already exists");
      res.status(400).send({ msg: "Username already exists" });
    }
  });
  
  // Service to authenticate a user's credentials for log-in
  router.get("/authenticateUser", async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (user && user.password === password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
  
  router.get("/", (req, res) => {
    res.send("hullo!");
  });

  module.exports = router;