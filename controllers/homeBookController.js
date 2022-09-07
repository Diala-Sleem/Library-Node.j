const BookModel = require("../models/bookModel");

exports.threeBookController = (req, res, next) => {
  BookModel.getThreebooks().then((books) => {
    res.render("index", { books: books, verifyUser: req.session.userId });
  });
};
