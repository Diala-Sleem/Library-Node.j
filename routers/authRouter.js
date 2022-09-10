const router = require("express").Router();
const authController = require("../controllers/authController");
const bodyParser = require("express").urlencoded({ extended: true });

const GuardAuth = require("./guardAuth");


router.get("/register", GuardAuth.isNotAuth, authController.getRegisterPage);
router.post("/register", bodyParser, authController.postRegisterData);


router.get("/login", GuardAuth.isNotAuth, authController.getLoginPage);
router.post("/login", bodyParser, authController.postLoginData);

router.get("/logout", bodyParser, authController.postLogoutData);
module.exports = router;
