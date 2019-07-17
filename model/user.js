//Load DB
const mongoose = require("mongoose")

//Load Joi validator
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

//Load json web token
const jwt = require("jsonwebtoken");

//Loading cofig
const config = require("config");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get("jwtPrivateKey"));

    return token;
}

const User = mongoose.model("User", userSchema)

function validateUser(params) {
    const schema = {
        name: Joi.string().min(7).max(255).required(),
        email: Joi.string().min(7).max(255).required().email(),
        password: Joi.string().min(7).max(255).required()
    }
    return Joi.validate(params, schema)
}

//Export the file
module.exports.User = User;
module.exports.validate = validateUser;