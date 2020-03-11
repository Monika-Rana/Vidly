const Joi = require('joi');
const  mongoose = require('mongoose');
const {genreSchema} = require('./genre');


const movieSchema  = new  mongoose.Schema({

    title: {
        type: String,
        require : true,
        trim: true,
        minlength:5,
        maxlength : 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type : Number,
        required: true,
        min:0,
        max: 255
    },
    dailyRental: {
        type : Number,
        required: true,
        min:0,
        max: 255
    }

});

const Movie = mongoose.model('Movies', movieSchema);
function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRental : Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;