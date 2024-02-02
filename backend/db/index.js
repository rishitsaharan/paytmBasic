const e = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");

mongoose.connect("mongodb+srv://rishitsaharan:Mehnakhera%401@cluster0.hzwsqmp.mongodb.net/PaytmBasic");

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
});

const AccountSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

UserSchema.methods.createHash = async function (password) {
    return await argon2.hash(password);
}

UserSchema.methods.validatePassword = async function(password) {
    return await argon2.verify(this.password, password);
}

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User,
    Account
}