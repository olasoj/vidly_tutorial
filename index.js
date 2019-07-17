const express = require("express");
const app = express();

const winston = require("winston");

require("./startup/logging")();
require("./startup/database")();
require("./startup/config")();
require("./startup/routes")(app)

//config
// console.log('App Name ' + config.get('name'))
// console.log('Mail Server ' + config.get('mail.host'))
// console.log('Mail Server ' + config.get('mail.password'))

const port = process.env.PORT || 3000;
//returns a server object
const server = app.listen(port, () => {
    winston.info(`listening on ${port}`);
});

module.exports = server;