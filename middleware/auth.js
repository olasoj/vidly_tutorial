//load json web token
const jwt = require("jsonwebtoken")

//load config
const config = require("config")

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Not authorized, no token")

    //jwt 
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("invalid token")
    }
}

module.exports = auth;