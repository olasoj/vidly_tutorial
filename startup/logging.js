//logger
const winston = require("winston")

//To handle routes errors
require("express-async-errors")


module.exports = function () { //adding another transport
    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }));


    //Handling Uncaught error (sync)
    process.on("uncaughtException", (ex) => {
        winston.error(ex.message, ex);
        process.exit(1)
    })

    //Forcing an error(sync)
    // throw new Error("bang")

    //Handling Uncaught error (async)
    process.on("unhandledRejection", (ex) => {
        winston.error(ex.message, ex);
        process.exit(1)
    })
}
//Forcing an error(async)
// const pzzz = Promise.reject(new Error("bang"))