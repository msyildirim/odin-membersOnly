const bcrypt = require('bcryptjs');
const passport = require("passport");
const User = require('../models/user');


exports.signup_get = function (req, res, next) {
    res.render('signup', {})
}

exports.signup_post = function (req, res, next){
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            mail: req.body.email,
            password: hashedPassword,
            status: req.body.status
        }).save().then(()=>{
            res.redirect('/')
        }).catch((err) => {
            console.log("Error in saving user:" + err)
        })
    })
}

exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/loginfail"
})


