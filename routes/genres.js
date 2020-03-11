
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {Genre , validate} = require('../models/genre');

router.get('/' , async (req, res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
router.get('/:id' ,async (req, res) =>{
    // const gen = genres.find(c => c.id=== parseInt(req.params.id)) ;
    // if(!gen) return res.status(400).send('Bad Request');

    // res.send(gen);

    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(400).send('Bad Request');
    res.send(genre);


} );

router.post('/' ,auth,  async  (req, res)=>{
    
    

    const{ error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // const genre =  {
    //     id: genres.length +1 , 
    //     name: req.body.name

    // };
    // genres.push(genre);
    // res.send(genre);

    let  genre = new Genre({name : req.body.name});
    genre =  await genre.save();
     res.send(genre);



});

router.put('/:id' ,async  (req, res)=>{

    // const  gen = genres.find(c => c.id === parseInt(req.params.id));
    //if(!gen) return res.status(400).send('Bad Request');

    // const{ error } = validateGenre(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    //  gen.name = req.body.name;
    //  res.send(gen);
    const{ error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new: true})
   if(!genre) return res.status(400).send('Bad Request');
   res.send(genre);


});

router.delete('/:id' , async (req, res)=>{
    // const  gen = genres.find(c => c.id === parseInt(req.params.id));
    // if(!gen) return res.status(400).send('Bad Request');

    // const index = genres.indexOf(gen);
    // genres.splice(index, 1);
    // res.send(genre);

    const genre = await Genre.findOneAndRemove(req.body.id);
    if(!genre) return res.status(400).send('Bad Request');
    res.send(genre);
});



module.exports = router;