const datos = require("../db/datos");


const indexController = {
    index: function (req, res) {
        return res.render('index', {datos}); //para que funcione el for de la vista hay que indicar que se extrae del objeto literal datos de la carpeta db
        
      }, 


};




module.exports = indexController; 
