//_id: 5a456845ab12645874dc265a , 24 character

//12 bytes, 24 characters
    //First 4 bytes : timestamp
    ////3 bytes : machine identifier
    //2 byte: process identifier
    //3 bytes : counter
   
//1 byte = 8 byte
//2^8 = 256
//2 ^24 = 16M // After this value counter byte will overflow


//Driver ->MongoDB, id is generated by driver, highly scalabe
//mongoose is abstraction over mongoDB Driver

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId(); // togenerate id
console.log(id);
console.log(id.getTimestamp());

mongoose.Types.ObjectId.isValid('12334'); //to validate teh id, false
