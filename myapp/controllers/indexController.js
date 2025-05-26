const datos = require("../db/datos");
const db = require(`../database/models`);
const Producto = db.Producto; 
const Usuario = db.Usuario; 


const indexController = {
    index: function (req, res) {
      Producto.findAll({
        include: [
            {association: "usuarios"},
        ]
    })

    .then(function (resultado) {
      //return res.send(resultado)
      return res.render('index', {datos: resultado}); //para que funcione el for de la vista hay que indicar que se extrae del objeto literal datos de la carpeta db
    })
    .catch(function(error){
      return res.send(error);
  })
}
};

module.exports = indexController; 
