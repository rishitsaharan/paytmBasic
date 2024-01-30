const express = require("express");
const Router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db/index");
const { JWT_SECRET } = require("../config");


Router.get("/", (req, res) => {
    res.json({
        message : "yo"
    });
});

Router.post("/signup", async (req, res) => {
    // console.log(req.body);
    const {username, password, firstName, lastName} = req.body;
    const userSchema = zod.object({
        username : zod.string().email(),
        password : zod.string().min(6),
        firstName : zod.string().min(3),
        lastName : zod.string()
    });
    const {success} = userSchema.parse(req.body);
    if(!success){    
        return res.status(411).json({
            message : "incorrect Inputs"
        });
    }

    const existingUser = await User.findOne({
        username : username
    });
    if(existingUser){
        res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        });
    }else{
        const newUser = await User.create({
            username : username,
            password : password,
            firstName : firstName,
            lastName : lastName
        });
        const newUserId = newUser._id;

        const jwtToken = jwt.sign({newUserId}, JWT_SECRET);
        res.status(200).json({
            message : "User created Successfully",
            token : jwtToken
        });
    }
});

Router.post("/signin", async (req, res) => {
    const {username, password} = req.body;
    const userSchema = zod.object({
        username : zod.string().email(),
        password : zod.string().min(6),
    });
    const {success} = userSchema.parse(req.body);
    if(!success){    
        return res.status(411).json({
            message : "incorrect Inputs"
        });
    }

    const existingUser = User.findOne({
        username : username,
        password : password
    });
    if(existingUser){
        const userId = existingUser._id;
        const jwtToken = jwt.sign({userId : userId}, JWT_SECRET);
        res.status(200).json({
            message : "User signed in",
            token : jwtToken
        });
    }
    else{
        res.status(411).json({
            message: "Error while logging in"
        })
    }
});
module.exports = Router;