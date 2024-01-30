const e = require("express");
const mongoose = require("mongoose");

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

const User = mongoose.model("UserSchema", UserSchema);

module.exports = {
    User
}