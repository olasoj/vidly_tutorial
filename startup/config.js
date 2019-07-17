const config = require("config");

module.exports = function () {
    //checking if enviroment variables are set
    if (!config.get("jwtPrivateKey")) {
        console.log("Fatal Error:jwtPrivateKey is not defined ")
        process.exit(1);
    }
}