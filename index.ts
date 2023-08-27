import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server dawg');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at htpp://localhost:${port}`);
});