const datos = require("../db/datos");

const indexController = {
    index: function (req, res) {
        return res.render('index', {datos });
        
      }, 


};




module.exports = indexController; 
