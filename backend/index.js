const express = require("express");
const app = express();
const apiRouter = require("./routes/index");
const cors = require("cors");
const jwt =require("jsonwebtoken");
const JWT_SECRET = require("./config");

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRouter);

// https://daily-code-web.vercel.app/tracks/oAjvkeRNZThPMxZf4aX5/LfskI6lnkcMQ7Qh2G1dX

app.listen(3000);