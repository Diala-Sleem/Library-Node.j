const mongoose = require("mongoose");
//--------------------------//

const schemaBook = mongoose.Schema({
  title: String,
  description: String, //
  price: Number, //
  author: String,
  image: String,
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