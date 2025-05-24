var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");
const datos = require("../db/datos")

// detalle 
router.get("/id/:id", productController.detalle);

//agregar
router.get("/product-add", productController.agregar);

//me falta la ruta de agregar nueva 

// search 
router.get("/search-results", productController.buscar);

//comentar 
router.post('/comentario/:id', productController.comentar);

module.exports = router;