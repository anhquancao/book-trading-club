var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authCtrl');
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express', user: req.user});
});
router.route('/sign-up')
    .get(authCtrl.signUp)
    .post(authCtrl.createUser);
router.route('/signout')
    .get(authCtrl.signOut);
router.route('/login')
    .get(authCtrl.login)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

module.exports = router;
