const router = require("express").Router();
const aboutController = require("../controllers/aboutController");
router.get("/about", aboutController.getPageAbout);

module.exports = router;
