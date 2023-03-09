const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const express = require('express');
const User = require('../models/user')

///authentication middlwares that will be used in app.js//
module.exports = function (app) {
    app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
    passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                // passwords match! log user in
                return done(null, user)
                } else {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" })
                }
            })
        }).catch(err=> {
            return done(err);
        })
    })
    );
    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(user=>{
            done(null, user);
        })
        .catch(err=>{
            done(err, null);
        })

    });
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.urlencoded({ extended: false }));
}
