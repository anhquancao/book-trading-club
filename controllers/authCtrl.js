var User = require('../models/User');

module.exports = {
    signOut: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    login: function (req, res) {
        var errors = req.flash('error');
        res.render('login', {errors: errors});
    },
    signUp: function (req, res) {
        res.render('signup', {title: "Sign up", currentPage: 'signup', signUpUser: {}});
    },
    createUser: function (req, res) {
        var errors = [];
        if (!req.body.username || !req.body.name || !req.body.password) {
            errors.push("All fields are required");
        }

        User.findOne({username: req.body.username}, function (err, user) {
            if (err) throw(err);
            if (user) {
                errors.push("Username has already existed");
            }
            if (errors.length > 0) {
                res.render('signup', {
                    title: "Sign up", currentPage: 'signup',
                    errors: errors,
                    signUpUser: {
                        name: req.body.name,
                        username: req.body.username,
                        password: req.body.password
                    }
                });
            } else {
                var user = new User();
                user.name = req.body.name;
                user.username = req.body.username;
                user.password = user.generateHash(req.body.password);

                user.save(function (err, user) {
                    if (err) return next(err);
                    req.login(user, function (err) {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect('/');
                    });
                });
            }
        });
    }
};
