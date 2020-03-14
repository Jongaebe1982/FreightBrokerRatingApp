require('dotenv').config();
require('./db');
const User = require('./db').User;
const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes');
const passport = require('passport');
const session = require('express-session');


const app = express();
app.use(session({ secret: 'budweiser' })); //stores the secret which is used to retrieve session data
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.get("/", (req, res) => {
  console.log(req.addedProperty);
  res.send("Welcome to my Freight Broker server!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Now listening')
});