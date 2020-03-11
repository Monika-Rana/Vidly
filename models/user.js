const jwt = require('jsonwebtoken');
const config = require('config');


const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        minlength : 5,
        maxlength : 50
    },
    email : {
        type : String,
        unique : true,
        require : true,
        minlength : 5,
        maxlength : 255
    },
    password : {
        type : String,
        require : true,
        minlength : 5,
        maxlength : 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey') );//(payload, privatekey)
    return token;
}

const User = mongoose.model('User' , userSchema );
function validateUser(user){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;



