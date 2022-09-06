const router = require("express").Router();
const authController = require("../controllers/authController");
const bodyParser = require("express").urlencoded({ extended: true });

router.get("/register", authController.getRegisterPage);
router.post("/register",bodyParser, authController.postRegisterData);
module.exports = router;
