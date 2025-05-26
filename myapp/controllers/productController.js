const datos = require("../db/datos");
const db = require(`../database/models`);
const Producto = db.Producto; 
const Comentario = db.Comentario;
const Op = db.Sequelize.Op; 

const productController = {
    
    detalle: function (req, res) {

        let productoBuscado = req.params.id; //busca id del navegador

        Producto.findByPk(productoBuscado, {
            include: [
                {
                    association: "usuarios", //trae los comentarios del prducto
                    include: [{ association: "usuarios" }] // dentro de cada comentario, trae el usuario que lo hizo 
                },
                { association: "usuarios" } // trae el usuario que publico el producto
            ]
        
        })
        .then(function (productoEncontrado) {
    
            return res.render("product", {
                detalle: productoEncontrado,
                comentarios: productoEncontrado.comentarios
            });
        })
        .catch(function (error) {
            return res.send("Error al buscar producto: " + error);
        });
        
      },

    agregar: function (req, res) {  // --> esta es ruta GET
        if (req.session.user != undefined) {  
            return res.redirect("/products/product-add") //si esta logueado lo manda a product add
      
        } else {
            return res.render("login") //lo que hace es que si no esta logueado lo manda a logearse
      
        }

    }, 
    
    agregarPost: function (req, res) { // procesa los datos, los agarra del formulario y realiza las acciones correspondientes 

            Producto.create({
                imagen: req.body.imagen, 
                nombre: req.body.producto, 
                descripcion: req.body.descripcion, 
            })
            .then(function () {
                return res.redirect('/product-add',{usuario: datos.usuario}) ;
              })
              .catch(function (error) {
                return res.send("Error al agregar el producto " + error)
      
              });
            
    
    
        }, 

    buscar: function (req, res) {
        //return res.send(req.query)
        let busqueda = req.query.search; //busca el query del forms

        Producto.findAll({
            where:{ nombre: {[Op.like]: '%' + busqueda + '%' }}, //buscar producto que coincida con la busqueda
            include: [{
                association: "usuarios" //trae datos del usuario para ver quien publico cada producto buscado
            }]
        })

        .then(function (resultados) {
            if (resultados === undefined) { //si no hay resultados, 
                return res.render("search-results", {resultados}) //se muestra la vista con el mensaje 
            }
            res.render("search-results", { productos: resultados }); //si hay resultados, se muestran los productos
            
        });
        
    },

    comentar: function (req, res) {
        // falta si no esta logueado 

        Comentario.create({
            texto: req.body.texto, //lo busca en el forms
            usuarioId: req.session.user.id, //id del usuario que comentó
            productoId: req.params.id, //id del producto del comentario
        })
        .then(function () {
            return res.redirect('/products/id/' + req.params.id);
          })
          .catch(function (error) {
            return res.send("Error al crear el comentario: " + error)
  
          });



    }

    }

module.exports = productController; 