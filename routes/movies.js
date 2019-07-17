//Express 
const express = require("express");
const router = express.Router();

//require the movie model and destructure all returned objects
const {
    Movie,
    validator
} = require("../model/movie");

//middleware
const authMiddleware = require("../middleware/auth");


//import the genre model
const {
    Genre
} = require("../model/genre");


router.get("/", async (req, res) => {
    //route handler
    const movies = await Movie.find();
    res.send(movies);
})

router.get("/:id", async (req, res) => {
    //route handler
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send("Movies doesn't exist");

    res.send(movie);
})

router.post("/", authMiddleware, async (req, res) => {
    //route handler
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genreFound = await Genre.findById(req.body.genreId);
    if (!genreFound) return res.status(404).send("invalid genre");

    const newMovie = await new Movie({
        title: req.body.title,
        genre: {
            _id: genreFound._id,
            name: genreFound.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try {
        const createdMovie = await newMovie.save();
        res.send(createdMovie)
    } catch (Ex) {
        res.status(500).send("counld not create movie at the moment, please try again later")
    }

})


router.put("/", authMiddleware, async (req, res) => {
    //route handler
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movies doesn't exist");

    const genreFound = await Genre.findById(req.body.genreId);
    if (!genreFound) return res.status(404).send("invalid genre");

    movie.set({
        title: req.body.title,
        genre: {
            _id: genreFound._id,
            nmae: genreFound.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
})

router.delete("/", async (req, res) => {
    //route handler
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send("Movies doesn't exist");

    res.send(movie);
})

module.exports = router;