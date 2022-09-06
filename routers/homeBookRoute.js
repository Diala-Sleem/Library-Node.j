const homeBookController = require("../controllers/homeBookController");
const router = require("express").Router()



router.get("/", homeBookController.threeBookController);

module.exports =router;
