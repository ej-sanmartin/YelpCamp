var express             = require("express"),
    router              = express.Router(),
    passport            = require("passport"),
    User                = require("../models/user");

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// =============
// AUTH ROUTES
// =============

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
router// register an user from given request body
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        // callback details
        if (err) {
            // display flash error message from the database
           req.flash("error", err.message);
           return res.render("register");
       }
        // authenticate the given user
        passport.authenticate("local")(req, res, function() {
            // display the welcome flash notification and redirect
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic with passport middleware
router.post("/login", passport.authenticate("local",  
    {
        successRedirect: "/campgrounds",
        failureRedirect: "login"
    }), function(req, res) {
});

// log out route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!"); // handle logout flash msg
   res.redirect("/campgrounds");
});

// export the router module
module.exports = router;