const productController = {
    detalle: function (req, res) {
        return res.render("product");
        
      },
    agregar: function (req, res) {
        return res.render("product-add");
        
    },

    }

module.exports = productController; 