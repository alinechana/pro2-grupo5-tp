const datos = require("../db/datos");
const db = require(`../database/models`);
const Producto = db.Producto; 

const productController = {
    detalle: function (req, res) {

        Producto.findAll({
            include: [
                {
                    association: "usuarios", 
                    association: "comentarios"
                }
            ]
        }
        )

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
        let busqueda = req.query.name; //busca el query del forms

        Producto.findAll({
            where:{ name: {[Op.like]: '%' + busqueda + '%' }}, //buscar producto que coincida con la busqueda
            include: [{
                association: "usuarios" //trae datos del usuario para ver quien publico cada producto buscado
            }]
        })

        .then(function (resultados) {
            if (resultados.length === 0) { //si no hay resultados, 
                return res.render("search-results", {resultados: [], //se muestra la vista con el mensaje
                    mensaje: "No hay resultados para la búsqueda"})
            }

            res.render("search-results", { productos: resultados }); //si hay resultados, se muestran los productos
            
        });
        
    }

    }

module.exports = productController; 