const router = require("express").Router();
const authController = require("../controllers/authController");
const bodyParser = require("express").urlencoded({ extended: true });

router.get("/register", authController.getRegisterPage);
router.post("/register", bodyParser, authController.postRegisterData);


router.get("/login", authController.getLoginPage);
router.post("/login", bodyParser, authController.postLoginData);

router.post("/logout", bodyParser, authController.postLogoutData);
module.exports = router;
