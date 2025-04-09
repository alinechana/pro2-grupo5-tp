const datos = require("../db/datos");

const productController = {
    detalle: function (req, res) {
        let productoBuscado = req.params.id;
        let productoEncontrado = {};

        for (let i = 0; i < datos.productos.length; i++) {
            const element = datos.productos[i];
            if (element.id == productoBuscado) {
                productoEncontrado = element
            }
        }

        return res.render("product", {detalle: productoEncontrado, comentarios: datos.comentarios });
        
      },
    agregar: function (req, res) {
        return res.render("product-add");
        
    },

    }

module.exports = productController; 