var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */

router.get("/register", usersController.register); //antes de la barra ya sabemos que va lo de users en app.js ya tenemos hecho el prefijo
router.post("/newUser", usersController.registerCreate);

router.get("/login", usersController.login);
router.post("/userLogin", usersController.loginCreate);

router.get("/logout", usersController.logout);

router.get("/profile", usersController.profile);


//router.get(`/login`, usersController.login); 

module.exports = router;
