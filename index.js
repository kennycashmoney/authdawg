/* ahhh... couldn't figure out how to get this to work in typescript 
*/
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    // db.User.findAll()
    //     .then((users) => res.send(users) )
    //     .catch((error) => {
    //         console.log(`db error... ${JSON.stringify(error)}`);
    //         return res.send(error);
    //     });
    db.User.findByPk(2)
        .then(user => user.destroy());
        res.send(201);
});

//TODO: service to create a new user
app.post('/v1/createNewUser', async (req, res) => {
    const { username, password } = req.body;
    db.User.create({ username, password })
        .then((user) => res.send(user))
        .catch((error) => {
            res.status(500).send(error)
        });
});

//TODO: service to authenticate a user's credentials for log-in



app.listen(port, () => {
    console.log(`[server]: Server is running at htpp://localhost:${port}`);
}); 