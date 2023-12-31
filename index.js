/* ahhh... couldn't figure out how to get this to work in typescript
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const authRouter = require("./routes/v1");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],  // this is for the todo app that runs on 3000 in dev
  })
);

app.use(bodyParser.json());

app.use("/v1", authRouter);

/**
 * swagger options
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AuthDawg API",
      version: "1.0.0",
      description: "A simple User Authentication API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
