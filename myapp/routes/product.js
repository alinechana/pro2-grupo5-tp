var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");
const datos = require("../db/datos")

// detalle 
router.get("/id/:id", productController.detalle);

//agregar productos add
router.get("/product-add", productController.agregar);

router.post("/product-add", productController.agregarPost);


// search 
router.get("/search-results", productController.buscar);

//comentar 
router.post('/comentario/:id', productController.comentar);

module.exports = router;