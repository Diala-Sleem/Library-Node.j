const BookModel = require("../models/bookModel");

exports.allBookController = (req, res, next) => {
  BookModel.getAllbooks().then((books) => {
    res.render("books", { books: books });
  });
};

exports.oneBookDetailsByIdController = (req, res, next) => {
  let id = req.params.id;
  BookModel.getOnebookDetails(id).then((resbook) => {
    res.render("details", { book: resbook });
  });
};
