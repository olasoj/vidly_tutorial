//Load express
const express = require("express");
const router = express.Router();

//Load Joi validator
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const {
    User
} = require("../model/user");

//Loading lodash
const _ = require("lodash");

//Loading bcrypt
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    //Route handler
    const {
        error
    } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send("invalid email or password");

    const ValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!ValidPassword) return res.status(400).send("invalid email or password");

    const token = user.generateAuthToken();
    res.send(token);
});

function validateAuth(params) {
    const schema = {
        email: Joi.string()
            .min(7)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(7)
            .max(255)
            .required()
    };
    return Joi.validate(params, schema);
}

module.exports = router;