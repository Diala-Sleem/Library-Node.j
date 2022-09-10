const BookModel = require("../models/bookModel");

exports.allBookController = (req, res, next) => {
  BookModel.getAllbooks().then((books) => {
    res.render("books", { books: books, verifyUser: req.session.userId });
  });
};

exports.oneBookDetailsByIdController = (req, res, next) => {
  let id = req.params.id;
  BookModel.getOnebookDetails(id).then((resbook) => {
    res.render("details", { book: resbook, verifyUser: req.session.userId });
  });
};

exports.getAddBookController = (req, res, next) => {
  res.render("addbook", {
    verifyUser: req.session.userId,
    Successmessage: req.flash("Successmessage")[0],
    Erorrmessage: req.flash("Erorrmessage")[0],
  });
};
exports.postAddBookController = (req, res, next) => {
  //console.log(req.body);
  //console.log(req.file.filename);
  BookModel.postDatebookmodel(
    req.body.title,
    req.body.description,
    req.body.author,
    req.body.price,
    req.file.filename,
    req.session.userId
  )
    .then((message) => {
      req.flash("Successmessage", message);
      res.redirect("/addbook");
    })
    .catch((err) => {
      req.flash("Erorrmessage", err);
      res.redirect("/addbook");
    });
};

//....mybook................................................................

exports.getMyBookController = (req, res, next) => {
  BookModel.getAllmyBooks(req.session.userId).then((books) => {
    //console.log(books)
    //console.log(req.session.userId)

    res.render("mybooks", {
      verifyUser: req.session.userId,
      myBooks: books,
    });
  });
};

exports.deleteMyBookController = (req, res, next) => {
  let id = req.params.id;
  BookModel.deleteBook(id)
    .then((verify) => {
      console.log(verify);
      res.redirect("/mybooks");
    })
    .catch((err) => {
      console.log(err);
    });
};

//----update book-------get-----------------

exports.getUpdateMyBookController = (req, res, next) => {
  let id = req.params.id;

  BookModel.getUpdateBookModel(id)
    .then((book) => {
      //console.log(book);
      res.render("updateMyBook", {
        verifyUser: req.session.userId,
        bookUpdate: book,
        Success: req.flash("Success")[0],
        Erorr: req.flash("Erorr")[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//----update book------------------------

exports.postUpdateMyBookController = (req, res, next) => {
  //console.log("id", req.params.id);
if(!req.file){  BookModel.postUpdateBookModel(
  req.params.id,
  req.body.title,
  req.body.description,
  req.body.author,
  req.body.price,
  req.body.oldImage
)
  .then((message) => {
    console.log("Controller book id: ", req.params.id);
    req.flash("Success", message);
    res.redirect(`/update/${req.params.id}`);
  })
  .catch((err) => {
    req.flash("Erorr", err);
    res.redirect(`/update/${req.params.id}`);
  });}else{  BookModel.postUpdateBookModel(
    req.params.id,
    req.body.title,
    req.body.description,
    req.body.author,
    req.body.price,
    req.file.filename
  )
    .then((message) => {
      console.log("Controller book id: ", req.params.id);
      req.flash("Success", message);
      res.redirect(`/update/${req.params.id}`);
    })
    .catch((err) => {
      req.flash("Erorr", err);
      res.redirect(`/update/${req.params.id}`);
    });}

};
