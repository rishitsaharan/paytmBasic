import { JWT_SECRET } from "../config";
const jwt = require("jsonwebtoken");

export const authMiddleware = (req, res, next) => {
    var token = req.headers["Authorization"];
    if(!token || !token.startsWith('Bearer ')){
        res.status(403).json({
            message: "Auth failed"
        });
    }
    token = token.split(" ")[1];
    try{
        const decodedValue = jwt.verify(token, JWT_SECRET);
        req.userId = decodedValue.userId;
        next();
    }
    catch(err){
        res.status(403).json({
            message: "Auth failed"
        });
    }  
}