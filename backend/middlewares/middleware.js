const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    var token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')){
        console.log(token);
        return res.status(403).json({
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
        return res.status(403).json({
            message: "Auth failed"
        });
    }  
}
module.exports = authMiddleware;