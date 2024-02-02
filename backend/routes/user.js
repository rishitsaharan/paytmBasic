const express = require("express");
const Router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db/index");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares/middleware");


Router.post("/signup", async (req, res) => {
    // console.log(req.body);
    const {username, password, firstName, lastName} = req.body;
    const userSchema = zod.object({
        username : zod.string().email(),
        password : zod.string().min(6),
        firstName : zod.string().min(3),
        lastName : zod.string()
    });
    const {success} = userSchema.safeParse(req.body);
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
        const newUser = new User({
            username : username,
            firstName : firstName,
            lastName : lastName
        });
        const passwordHash = await newUser.createHash(password);
        newUser.password = passwordHash;
        await newUser.save();

        const newUserId = newUser._id;
        const newAccount = await Account.create({
            userID : newUserId,
            balance : (Math.random() * 10000) + 1
        });

        const jwtToken = jwt.sign({userId : newUserId}, JWT_SECRET);
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
    const {success} = userSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "incorrect Inputs"
        });
    }

    const existingUser = await User.findOne({
        username : username
    });
    if(existingUser == null){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    else{
        if(await existingUser.validatePassword(password)){
            const userId = existingUser._id;
            const jwtToken = jwt.sign({userId : userId}, JWT_SECRET);
            return res.status(200).json({
                message : "User signed in",
                token : jwtToken
            });
        }
        else{
            console.log("error");
            return res.status(411).json({
                message: "Error while logging in"
            })
        }
    }
});

Router.post("/", authMiddleware, async (req, res) => {
    const userSchema = zod.object({
        password : zod.string().min(6).optional(),
        firstName : zod.string().min(3).optional(),
        lastName : zod.string().optional()
    })
    const {success} = userSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        })
    }
    const userId = req.userId;
    const updatedUser = await User.findOneAndUpdate({
        _id : userId
    }, req.body);
    res.status(200).json({
        message : "updated successfully"
    })
});

Router.post("/bulk", authMiddleware, async(req, res) => {
    const userId = req.userId;
    const name = req.query.filter || "";
    const users = await User.find({
        $or : [{
            firstName : new RegExp(name, 'i')
        }, {
            lastName : new RegExp(name, 'i')
        }]
    });

    return res.json({
        user : users
        .filter(user => user._id != userId)
        .map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})
module.exports = Router;