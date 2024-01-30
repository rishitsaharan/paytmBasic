const express = require("express");
const Router = express.Router();
const userApiRouter = require("./user");

Router.use("/user", userApiRouter);


module.exports = Router;


