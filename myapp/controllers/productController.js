const datos = require("../db/datos");

const productController = {
    detalle: function (req, res) {
        let productoBuscado = req.params.id;
        let productoEncontrado = {};

        //este for va a lograr que cuando uno aprieta la foto del producto se rediriga a la foto indicada
        for (let i = 0; i < datos.productos.length; i++) { //por cada producto en datos
            const element = datos.productos[i];
            if (element.id == productoBuscado) { //si el id de ese producto es igual a el producto que busco, establecemos que ESE producto es el producto encontrado
                productoEncontrado = element
            }
        }

        return res.render("product", {detalle: productoEncontrado, comentarios: datos.comentarios }); //va a devolver el producto que encontro y los comentarios que corresponden
        
      },
    agregar: function (req, res) {
        return res.render("product-add", {usuario: datos.usuario});
        
    },
    buscar: function (req, res) {
        return res.render("search-results", {datos});
        
    },

    }

module.exports = productController; 