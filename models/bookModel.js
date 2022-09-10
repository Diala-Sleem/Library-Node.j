const mongoose = require("mongoose");
//--------------------------//

const schemaBook = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
  }, //
  price: {
    type: Number,
    required: true,
  }, //
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: String,
});
//--------------------------//
let Book = mongoose.model("book", schemaBook);
let url = "mongodb://localhost:27017/library";

//------------index--3book------------//
exports.getThreebooks = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Book.find({}).limit(3);
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

//------------all book in our book--------------//

exports.getAllbooks = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Book.find({});
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

//------------get one book in  book details--------------//

exports.getOnebookDetails = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Book.findById(id);
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

exports.postDatebookmodel = (
  title,
  description,
  author,
  price,
  image,
  userId
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        let book = new Book({
          title: title,
          description: description,
          author: author,
          price: price,
          image: image,
          userId: userId,
        });
        return book.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("book added Successfully!");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err.message);
      });
  });
};

//............mybook................................

exports.getAllmyBooks = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Book.find({ userId: userId });
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

//----delete book------------------------

exports.deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Book.deleteOne({ _id: id });
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

//----update book-------get-----------------

exports.getUpdateBookModel = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Book.findById(id);
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};
//----update book------post------------------

exports.postUpdateBookModel = (
  id,
  title,
  description,
  author,
  price,
  filename,
  userId
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        //console.log("Book ID: ", bookId);
        return Book.updateOne(
          { id },
          {
            title: title,
            description: description,
            author: author,
            price: price,
            image: filename,
          }
        );
      })
      .then(() => {
        mongoose.disconnect();
        resolve("book updated Successfully!");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err.message);
      });
  });
};
