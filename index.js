/* ahhh... couldn't figure out how to get this to work in typescript 
*/
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();

const dotenv = require('dotenv');

// const port = process.env.PORT;
const port = 3000;

dotenv.config();
app.use(bodyParser.json());

/** 
 * API endpoints
 */

// Service to create a new user
app.post('/v1/createNewUser', async (req, res) => {
    const { username, password } = req.body;
    // TODO: validate the username doesn't already exist
    db.User.create({ username, password })
        .then((user) => res.send(user))
        .catch((error) => {
            res.status(500).send(error)
        });
});

// Service to authenticate a user's credentials for log-in
app.get('/v1/authenticateUser', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username }});
    if (user && user.password === password) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});


app.listen(port, () => {
    console.log(`[server]: Server is running at htpp://localhost:${port}`);
}); 