const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database '+config.database);
});
//on error
mongoose.connection.on('error', () => {
  console.log('Database Erro '+config.database);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 3000;

app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//users routers
app.use('/users',users);

//index route
app.get('/',(req,res) =>{
  res.send('Invalid Endpoint');
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port,  () => {
  console.log('Server started on port'+port);
});
