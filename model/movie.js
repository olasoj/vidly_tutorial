//Load mongoose(db)
const mongoose = require("mongoose");

//require genre schema
const {
    genreSchema
} = require('./genre');

//Create the schema for the movies validator
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

//Create the model
const Movie = mongoose.model("Movie", movieSchema);

function moviesValidator(params) {
    schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255)
    }

    return Joi.validate(params, schema)
}

//Export the movie model and the movie vaidator
module.exports.Movie = Movie
module.exports.validator = moviesValidator;