const express = require("express");
const Router = express.Router();
const { User, Account } = require("../db/index");
const authMiddleware = require("../middlewares/middleware");

Router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const requiredAccount = await Account.findOne({
        userID : userId
    });
    if(requiredAccount){
        const balance = requiredAccount.balance;
        res.status(200).json({
            balance : balance
        })
    }
    else{
        res.status(411).json({
            message : "No Account found"
        })
    }
})

module.exports = Router;