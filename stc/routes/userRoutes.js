// Wouter
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router
    .route("/register")
    .get((req, res) => {
        res.render("users/register.ejs");
    })
    .post(async (req, res) => {
        try {
            const {
                name,
                email,
                password,
                phoneNumber
            } = req.body.user;
            const username = email;
            const user = new User({
                name,
                email,
                username,
                phoneNumber
            });
            const registerUser = await User.register(user, password);
            req.login(registerUser, (err) => {
                if (err) console.log(err);
                res.redirect("/");
            });
        } catch (e) {
            console.log(e);
        }
    });

router
    .route("/login")
    .get((req, res) => {
        res.render("users/login.ejs");
    })
    .post(passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: false
    }));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});