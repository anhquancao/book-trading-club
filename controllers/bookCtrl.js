var Book = require('../models/Book');
var googleBooks = require('google-books-search');
// var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    requestTrade: function (req, res) {
        var bookId = req.params.bookId;
        Book.findById(bookId,function(err,book){
            if (err) console.log(err);

        })
    },
    myBook: function (req, res) {
        var books = Book.find({owner_id: req.user._id}, function (err, books) {
            if (err) console.log(err);
            res.render('mybooks', {user: req.user, currentPage: 'mybooks', books: books, user: req.user});
        });
    },
    allBooks: function (req, res) {
        var books = Book.find({}, function (err, books) {
            if (err) console.log(err);
            res.render('allbooks', {user: req.user, currentPage: 'allbooks', books: books, user: req.user});
        });
    },
    addBook: function (req, res) {
        var bookName = req.body.bookname;
        googleBooks.search(bookName, function (error, results) {
            if (!error) {
                var tempBook = results[0];
                var book = new Book();
                book.name = tempBook.title;
                book.owner_id = req.user._id;
                book.image_url = tempBook.thumbnail;
                book.save(function (err, book) {
                    if (err) console.log(err);
                    res.redirect('/my-books')
                });
                console.log(results);
            } else {
                console.log(error);
            }

        });
    }
};
