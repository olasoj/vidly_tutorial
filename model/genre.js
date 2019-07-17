//Load mongoose module
const mongoose = require("mongoose");

//Load joi module
const Joi = require("joi");

//create schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});

//create model
const Genre = mongoose.model("Genre", genreSchema);


function validateGenre(params) {
    const schema = {
        name: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(params, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;