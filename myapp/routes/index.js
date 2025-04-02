var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/index", indexController.index);

/* GET home page... */
router.get('/', indexController.index);

module.exports = router;
