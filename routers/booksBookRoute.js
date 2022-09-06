const booksBookController = require("../controllers/booksBookController");
const router = require("express").Router();

router.get("/", booksBookController.allBookController);

router.get("/:id", booksBookController.oneBookDetailsByIdController);

module.exports = router;
