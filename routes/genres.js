//Load the express module
const express = require('express')
const router = express.Router();

//Load mongoose
const validateObjectId = require("../middleware/validateObjectId")

//Load genre module
const {
    Genre,
    validate
} = require("../model/genre");

//middleware
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

//get genres
router.get("/",
    async (req, res, next) => {
        const allGenre = await Genre.find()
        res.send(allGenre);
    }
);

//get genres by id
router.get("/:id", validateObjectId, async (req, res) => {
    const findDoc = await Genre.findById(req.params.id)
    if (!findDoc) return res.status(404).send("genre not found");

    res.send(findDoc)
});

//Post genres
router.post("/", authMiddleware, async (req, res) => {

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //create a new genre
    const newGenre = await new Genre({
        name: req.body.name
    });

    //new genre created
    try {
        const createdGenre = await newGenre.save();
        res.send(createdGenre)
    } catch (ex) {
        res.status(500).send(ex.message)
    }
});

//Update genres
router.put("/:id", authMiddleware, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foundGenre = await Genre.findById(req.params.id)
    if (!foundGenre) return res.status(404).send("genre not found");

    foundGenre.set({
        name: req.body.name
    })

    try {
        const updatedGenre = await foundGenre.save()
        res.send(updatedGenre)
    } catch (Ex) {
        res.status(500).send(ex.message)
    }

});

//delete genres
router.delete("/:id", [authMiddleware, admin], async (req, res) => {
    const foundGenre = await Genre.findByIdAndRemove(req.params.id)
    if (!foundGenre) return res.status(404).send("genre not found");

    res.send(foundGenre)
});

module.exports = router;