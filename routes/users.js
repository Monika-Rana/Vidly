const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _  = require('loadsh');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {User , validate} = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');

router.get('/me' ,auth,  async (req, res) => {

const user = User.findByID(req.user._id).select('-password');
res.send(user);
});


router.post('/' , async (req, res)=>{
    const{ error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user =await  User.findOne({email: req.body.email});
    if(user) return res.status(400).send('user alerady registered');

    user = new User(_.pick(req.body, ['name' , 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
     //res.send(user);
    //  res.send({
    //      name: user.name,
    //      email: user.email
    //  });
    const token = user.geneateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['id' ,'name' , 'email']));
    


});

module.exports  = router;