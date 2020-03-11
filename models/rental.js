const Joi = require('joi');
const mongoose = require('mongoose');

const rentlSchema = new mongoose.Schema({
    customer: {
        type : new mongoose.Schema({
            name : {
                type: String,
                required : true,
                minlength : 5,
                maxlength: 50
            },
            isGold : {
                type: Boolean,
                default : false
            },
            phone: {
                type : Number,
                require : true,
                minlength:10,
                maxlength:50
            }
        }),
        required: true
    }, 
    movie : {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim:true,
                minlength: 5,
                maxlength:255
            },
            dailyRental: {
                type : Number,
                required: true,
                min:0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min:0
    }
});

function validateRental(rental){
    const schema = {
        customerId: Joi.String().required(),
        movieId: Joi.String().required()
    };
    return Joi.validate(rental, schema);
}