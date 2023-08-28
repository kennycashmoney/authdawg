/* ahhh... couldn't figure out how to get this to work in typescript 
*/
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
    // origin: 'https://productivitypal.vercel.app'
}));


app.use(bodyParser.json());

/** 
 * API endpoints
 */

// Service to create a new user
app.post('/v1/createNewUser', async (req, res) => {

    // TODO: figure out how to catch encrypted credentials
    // console.log(req);
    console.log('Request to create new user...');
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
        res.status(400).send('Username already exists');
    }


});

// Service to authenticate a user's credentials for log-in
app.get('/v1/authenticateUser', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (user && user.password === password) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});


app.listen(port, () => {
    console.log(`[server]: Server is running at htpp://localhost:${port}`);
}); 