require('dotenv').config();
require('./db');
const User = require('./db').User;
const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes');
const passport = require('passport');
// const GithubStrategy = require('passport-github2').Strategy;
const session = require('express-session');


const app = express();
app.use(session({ secret: 'budweiser' })); //stores the secret which is used to retrieve session data
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
// passport.use(new GithubStrategy({
//     clientID: process.env.GITHUB_CLIENT,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: process.env.GITHUB_CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
//     console.log(profile);
//     try {
//         let results = await User.findOrCreate({ where: { username: profile.username } })
//         let user = results[0];
//         let isCreated = results[1];
//         done(null, user);
//     }
//     catch (error) {
//         done(error, null);
//     }
// }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Now listening')
});