const booksBookController = require("../controllers/booksBookController");
const bodyParser = require("express").urlencoded({ extended: true });

const router = require("express").Router();
const GuardAuth = require("./guardAuth");
const multer = require("multer"); //middleware for handling multipart/form-data

router.get("/books", GuardAuth.isAuth, booksBookController.allBookController);

router.get(
  "/books/:id",
  GuardAuth.isAuth,
  booksBookController.oneBookDetailsByIdController
);

router.get(
  "/addbook",
  GuardAuth.isAuth,
  booksBookController.getAddBookController
);

//---------------------store image--------------------
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//***
router.post(
  "/addbook",
  multer({ storage }).single("image"),
  GuardAuth.isAuth,
  booksBookController.postAddBookController
);

//--------------mybook----------------

router.get(
  "/mybooks",
  GuardAuth.isAuth,
  booksBookController.getMyBookController
);

router.post(
  "/delete/:id",
  GuardAuth.isAuth,
  booksBookController.deleteMyBookController
);

router.get(
  "/update/:id",
  GuardAuth.isAuth,
  booksBookController.getUpdateMyBookController
);
//----update book------------------------

router.post(
  "/update/:id",
  bodyParser,
  multer({ storage }).single("image"),
  GuardAuth.isAuth,
  booksBookController.postUpdateMyBookController
);

//--------------------------------
module.exports = router;
