const datos = require("../db/datos");
const db = require(`../database/models`);
const bcrypt = require("bcryptjs");
const Usuario = db.Usuario; 
const Producto = db.Producto;


const usersController = {

  register: function (req, res) { //si ya esta logueado, lo manda a su perfil
    if (req.session.user != undefined) {  
      return res.redirect("/users/login")

    } else {
      return res.render("register")

    }

  },

  registerCreate: function (req, res) {
    let email = req.body.email //guarda mail y constrasenia del form
    let contrasenia = req.body.contraseña

    if (email == undefined) { //if que verifica si el mail esta vacio
      return res.send("El campo email no puede estar vacío")
      
    }

    db.Usuario.findOne({ //busca si ya existe el mail en la base de datos
      where: [{ email: email }]  //tiene que coincidir el email con alguno en la base de datos si ya existe
    })
      .then(function (resultado) {
        
        if (resultado) { //si ya esta ese mail, devuelve el mensaje
          return res.send("Tu mail ya esta registrado")
        } 

        if (contrasenia.length <= 3 || contrasenia == " ") { //si la contra no cumple
          return res.send("La contraseña debe ser mayor a 3 caracteres")
        } //devuelve ese mensaje
  
      
        let passEncriptada = bcrypt.hashSync(contrasenia, 10); //encripta la contra

        db.Usuario.create({ //crea un nuevo usuario en la base de datos
          email: email,
          contrasenia: passEncriptada,
          fecha: req.body.fecha,
          dni: req.body.dni,
          foto: req.body.foto
        })
          .then(function (user) {
            return res.redirect("/users/login") //si se creo el usuario, lo lleva a home
          })
          .catch(function (error) {
            return res.send("Error al crear el usuario: " + error)
  
          });

      })
        .catch(function (error) {
            return res.send("Error al verificar el email: " + error)

      });

  },

  login: function (req, res) {
    if (req.session.user != undefined) { //si ya esta logueado, va al perfil
      return res.redirect("/users/profile")
    } else {
      return res.render("login")
    }
  },

  loginCreate: function (req, res) {
    let userInfo = { //tomo todos los datos del forms para despues procesarlos
      email: req.body.email,
      contrasenia: req.body.contraseña,
      recordarme: req.body.recordarme
    }
    //validar que el email y la password sean correctas
    db.Usuario.findOne({
      where: [{ email: userInfo.email }]
    })
      .then(function (resultado) {
        if (resultado == undefined) { //si no existe ese mail, muestra mensaje
          return res.send ("El email no está registrado")
          
        }

        let email = resultado.email
        let password = resultado.contrasenia

        if (bcrypt.compareSync(userInfo.contrasenia, password)) {  //compara que sea la contraseña correcta
          //poner en session
         
          req.session.user = resultado;
        
          //check de recordarme
          if (userInfo.recordarme != undefined) {
            res.cookie("user", userInfo, { maxAge: 600000 })
          }
          res.redirect("/")

        }else{ //si no es la contraseña correcta, error
          return res.send("La contraseña es incorrecta")
        }
      })

      .catch(function (err) {
        return res.send(err)
      })

  },

  logout: function (req, res) {
    req.session.destroy();
    res.clearCookie("user");
    return res.redirect("/");
  },

  profile: function (req, res) {
    
    let idDelUsuario = req.params.id;

    Usuario.findByPk(idDelUsuario, {
      include: [{ association: "productos" }]
    })
    
    .then(function (usuarioEncontrado) {
      //return res.send(resultado)
      res.render("profile", {
        usuario: usuarioEncontrado,
        productos: usuarioEncontrado.productos,
        totalProductos: usuarioEncontrado.productos.length})
      
    })
    .catch(function (error) {
      res.send(error)
    })
  }
}


module.exports = usersController; 