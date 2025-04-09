var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");
const datos = require("../db/datos")

// detalle 
router.get("/id/:id", productController.detalle);

//agregar
router.get("/product-add", productController.agregar);

// search 

module.exports = router;