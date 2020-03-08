const User = require('../db').User;
const passport = require('passport');

exports.registerPage = (req, res) => res.render('register');

exports.registerUser = (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    User.register(username, password, (error, registeredUser) => {
        if (error) {
            console.log(error);
            res.status(500).send();
        }
        res.send("Created user: " + username);
    });
};

exports.loginPage = (req, res) => res.render('login');

exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login'
});

exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('login');
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.url;
    res.redirect('login');
};



