const router = require("express").Router();
const contactController=require('../controllers/contactController')

router.get("/contact", contactController.getPageContact);

module.exports = router;
