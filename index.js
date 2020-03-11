const config = require('config');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const users = require('./routes/users');
const customers = require('./routes/customer');
const genres = require('./routes/genres');
const home = require('./routes/home');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
//{ useNewUrlParser: true ,useUnifiedTopology: true}
mongoose.connect('mongodb+srv://localhost/vidly' )
.then(() => console.log('connected to mongodb..'))
.catch(err => console.error('could not connect to mongodb..'));

if(!config.get('jwtPrivateKey')){
console.error('FATAL Error : JwtPrivateKey Not Defined');
process.exit(1);
}


app.use(express.json());
app.set('view engine' , 'pug');
app.set('views' ,'./views');
app.use('/api/genres' , genres);
app.use('/api/customers' , customers);
app.use('/api/movies' , movies);
app.use('api/rentals' , rentals);
app.use('/' , home);
app.use('/api/users' , users);
app.use('/api/auth' , auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}..`));
