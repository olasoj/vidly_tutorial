//Load express
const express = require("express");
const router = express.Router();

const {
    User,
    validate
} = require("../model/user");

//Loading lodash
const _ = require("lodash");

//Loading bcrypt
const bcrypt = require("bcrypt");

const authMiddleware = require("../middleware/auth")

//Get the current user
router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user)
})

//create an new user
router.post("/", async (req, res) => {
    //Route handler
    const {
        error
    } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    })
    if (user) return res.status(400).send("User already registered")

    user = await new User(
        _.pick(req.body, ["name", "email", "password"])
    )

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    try {
        await user.save();
        const token = user.generateAuthToken();

        res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]))
    } catch (ex) {
        res.status(500).send("Counldn't create user at the moment, please try again later")
    }
})

module.exports = router;