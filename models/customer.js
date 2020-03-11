const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        minlength : 5,
        maclength : 50
    },
    isGold : {
        type :Boolean,
        default : false
    },
    phone : {
        type : String,
        require : true,
        minlength : 10,
        maxlength : 50
    }
});
const Customer = mongoose.model('Customer' , customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;