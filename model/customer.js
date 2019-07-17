//Load mongoose module
const mongoose = require("mongoose");

//Load joi module
const Joi = require("joi");

//define collection structure
const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});


//create the model
const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(params) {
    const schema = {
        name: Joi.string()
            .min(4)
            .required(),

        phone: Joi.string()
            .min(11)
            .required(),

        isGold: Joi.boolean()
    };

    return Joi.validate(params, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer();