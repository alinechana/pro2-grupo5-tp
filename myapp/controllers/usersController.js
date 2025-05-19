const datos = require("../db/datos");
const db = require(`../database/models`);
const bcrypt = require("bcryptjs");

const usersController = {
  register: function (req, res) {
    if (req.session.user != undefined) {  //user falta login 
      return res.redirect("/users/login")

    } else {
      return res.render("register")

    }

  },
  registerCreate: function (req, res) {
    let email = req.body.email

    db.Usuario.findOne({
      where: [{ email: email }]
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
        contrasenia: passEncriptada,
        fecha: req.body.fecha
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
    if (req.session.user != undefined) {
      return res.redirect("/")
    } else {
      return res.render("login")
    }
  },
  loginCreate: function (req, res) {
    let userInfo = {
      email: req.body.email,
      contrasenia: req.body.contraseña,
      recordarme: req.body.recordarme
    }
    //validar que el email y la password sean correctas
    db.Usuario.findOne({
      where: [{ email: req.body.email }]
    }).then(function (resultado) {
      let email = resultado.email
      let password = resultado.password

      if (email != undefined && bcrypt.compareSync(userInfo.contrasenia, password)) {
        //poner en session
        req.session.user = resultado;
      }
      //check de recordarme
      if (userInfo.recordarme != undefined) {
        res.cookie("user", userInfo, { maxAge: 600000 })
      }

      res.redirect("/")
    })
      .catch(function (err) {
        return res.send(err)
      })

  },
  logout: function (req, res) {
    req.session.destroy()
    res.clearCookie("user")
    return res.redirect("/")
  },
  profile: function (req, res) {
    return res.render("profile", { usuario: datos.usuario, productosProfile: datos.productos, comentarios: datos.comentarios }) // defino que usuario = datos.usuario
  }
}


module.exports = usersController; 