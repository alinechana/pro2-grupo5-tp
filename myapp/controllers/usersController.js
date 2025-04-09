const datos = require("../db/datos");
const usersController = {
    register: function (req, res) {
        return res.render("register")
        
      },
    login: function (req, res) {
      return res.render("login")
    },
    profile: function (req, res) {
      return res.render("profile", {usuario: datos.usuario, productosProfile: datos.productos, comentarios: datos.comentarios}) // defino que usuario = datos.usuario
    }
}


module.exports = usersController; 