//Load express module
const express = require("express")
const router = express.Router();

//Load customer module
const {
    Customer,
    validate
} = require("../model/customer");

//middleware
const authMiddleware = require("../middleware/auth");

//creating routes
//get all customers
router.get("/", async (req, res) => {
    //route handelers
    const customers = await Customer.find()
    res.send(customers)
})

//get customers by id
router.get("/:id", async (req, res) => {
    //route handelers
    const customerFound = await Customer.findById(req.params.id)

    //if customer isn't found
    if (!customerFound) {
        res.status(404).send("Customer doesn't exists")
    }

    res.send(customerFound)
})

//create a new customer
router.post("/", authMiddleware, async (req, res) => {
    //route handelers
    //Error handler
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    createCustomer = await new Customer({
        isGold: false,
        name: req.body.name,
        phone: req.body.phone
    })

    createdCustomer = await createCustomer.save()
    res.send(createdCustomer)
})

//update a customer
router.put("/:id", authMiddleware, async (req, res) => {
    //route handelers
    //Error Handler
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customerFound = await Customer.findById(req.params.id)

    //if customer isn't found
    if (!customerFound) {
        res.status(404).send("Customer doesn't exists")
    }

    customerFound.set({
        name: req.body.name,
        phone: req.body.phone
    })

    updatedCustomer = await customerFound.save()
    res.send(updatedCustomer)
})

//delete a customer
router.delete("/:id", async (req, res) => {
    //route handelers
    const customerFound = await Customer.findByIdAndRemove(req.params.id)

    //if customer isn't found
    if (!customerFound) {
        res.status(404).send("Customer doesn't exists")
    }

    res.send(customerFound)
})

module.exports = router