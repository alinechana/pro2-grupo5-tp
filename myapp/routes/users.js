var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */

router.get("/register", usersController.register);
router.get("/login", usersController.login);
router.get("/profile", usersController.profile);


//router.get(`/login`, usersController.login); 

module.exports = router;
