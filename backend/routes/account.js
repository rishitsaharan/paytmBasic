const express = require("express");
const Router = express.Router();
const { User, Account } = require("../db/index");
const authMiddleware = require("../middlewares/middleware");
const { MongoClient } = require('mongodb');
const { default: mongoose } = require("mongoose");

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

Router.post("/transfer", authMiddleware, async(req, res) => {
    const from = req.userId;
    const {to, amount} = req.body;

    const session = await mongoose.startSession();
    try{
        await session.withTransaction(async() => {
            const fromUser = await Account.findOne({ userID : from});
            if(!fromUser || fromUser.balance < amount){
                return res.status(400).json({
                    message : "Insufficient Funds"
                });
            }
            
            const toUser = await Account.findOne({ userID : to});
            if(!toUser){
                return res.status(400).json({
                    message : "Invalid User"
                });
            }

            await Account.updateOne({
                userID : from
            }, {
                $inc : {balance : -amount}
            });

            await Account.updateOne({
                userID : to
            }, {
                $inc : {balance : amount}
            });

            res.status(200).json({
                message: "Transfer successful"
            })
        })
    }
    finally{
        await session.endSession();
    }
})
module.exports = Router;