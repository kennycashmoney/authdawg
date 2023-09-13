const express = require("express");
const router = express.Router();
const db = require("../models");

/**
 * API endpoints
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required: 
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id of the user
 *              username: 
 *                  type: string
 *                  description: The username of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *              last_logon:
 *                  type: Date
 *                  description: The date the user last logged in
 *              createdAt:
 *                  type: Date
 *                  description: The date the user was created
 *              updatedAt:
 *                  type: Date
 *                  description: The date the user record was last updated
 *          example: 
 *              id: 3
 *              username: kennycashmoney
 *              password: asdf
 *              last_logon: null
 *              createdAt: 2023-08-27 22:11:42.614 +00:00
 *              updatedAt: 2023-08-27 22:11:42.614 +00:00
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The coolest user authorization API
 */

/**
 * @swagger
 * /v1/createNewUser:
 *  post:
 *      summary: Creates a new user
 *      tags: [Users]
 *      description: Create a new user with the provided information
 *      requestBody:
 *          description: User information to create a new user
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username: 
 *                              type: string
 *                          password:       
 *                              type: string
 *      responses: 
 *          201:
 *              description: successfully created a new user
 *          500:
 *              description: An error occurred trying to create the user
 *          400:
 *              description: The username already exists
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
  

  /**
 * @swagger
 * /v1:
 *  get:
 *      summary: do a stupid test of the routing
 *      responses: 
 *          200:
 *              description: API will say 'hullo!'
 */
  router.get("/", (req, res) => {
    res.send("hullo!");
  });

  module.exports = router;