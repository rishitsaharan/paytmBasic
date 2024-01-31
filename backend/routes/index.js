const express = require("express");
const Router = express.Router();
const userApiRouter = require("./user");
const accountApiRouter = require("./account");

Router.use("/user", userApiRouter);
Router.use("/account", accountApiRouter);

module.exports = Router;


