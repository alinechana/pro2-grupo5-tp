const datos = require("../db/datos");
const db = require(`../database/models`);
const bcrypt = require("bcryptjs");

const usersController = {
    register: function (req, res) {
        return res.render("register")
        
      },
      create: function(req,res){
        let email = req.body.email 

        db.Usuario.findOne({
          where: [{ email: email}]
        })
        .then(function (resultado) {
          if (resultado.email == email) {
            return res.send("Tu mail ya esta registrado")
            
          }
          
        })
        .catch(function (error) {
          return res.send(error)
          
        })

        let contrasenia = req.body.contraseña
        if (contrasenia.length < 3 || constrasenia == " ") {
          return res.send("La contraseña debe ser mayor a 3 caracteres")

        } else {
          let passEncriptada = bcrypt.hashSync(contrasenia, 10);

        db.Usuario.create({
          usuario: req.body.name, 
          email: req.body.email, 
          contrasenia: passEncriptada
        })
        .then(function (user) {
          return res.redirect("/")
        }) 
        .catch(function (error) {
          return res.send(error)
          
        })

        }

      }, 




    login: function (req, res) {
      return res.render("login")
    },
    profile: function (req, res) {
      return res.render("profile", {usuario: datos.usuario, productosProfile: datos.productos, comentarios: datos.comentarios}) // defino que usuario = datos.usuario
    }
}


module.exports = usersController; 