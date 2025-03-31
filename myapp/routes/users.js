var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get(`/register`, usersController.register);

module.exports = router;
