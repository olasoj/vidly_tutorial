//database
const mongoose = require("mongoose");
//load config
const config = require("config")
//logger
const winston = require("winston")

module.exports = function () {
    const db = config.get('db')
    const conn = mongoose.connect(db)
    conn.then(() => {
        winston.info(`connected to ${db}`);
    });
}