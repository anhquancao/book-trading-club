var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authCtrl');
var passport = require('passport');
var authMiddleware = require('../middlewares/authMiddleware');
var bookCtrl = require('../controllers/bookCtrl');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express', user: req.user});
});
router.route('/my-books')
    .get(authMiddleware.isLoggedIn, bookCtrl.myBook)
    .post(authMiddleware.isLoggedIn, bookCtrl.addBook);
router.get('/request/:bookId',authMiddleware.isLoggedIn,bookCtrl.requestTrade);
router.get('/cancel-request/:bookId',authMiddleware.isLoggedIn,bookCtrl.cancelTrade);
router.route('/all-books')
    .get(authMiddleware.isLoggedIn, bookCtrl.allBooks);

router.get('/accept/:bookId',authMiddleware.isLoggedIn,bookCtrl.confirm);

router.route('/requesting-books')
    .get(authMiddleware.isLoggedIn, bookCtrl.requestingBooks);
router.route('/requested-books')
    .get(authMiddleware.isLoggedIn, bookCtrl.requestingBooks);

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
