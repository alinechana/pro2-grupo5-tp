module.exports = function (sequelize, dataTypes) {
    
let alias = "Usuario"; 
let cols = {
    id: {
        autoIncrement: true, 
        primaryKey: true, 
        type: dataTypes.INTEGER

    }, 

    email: {
        type: dataTypes.STRING

    }, 

    contrasenia: {
        type: dataTypes.STRING

    }, 

    fecha: {
        type: dataTypes.DATE
    }, 

    dni: {
        type: dataTypes.INTEGER
    }, 

    createdAt: {
        type: dataTypes.DATE

    },

    updatedAt:{
        type: dataTypes.DATE

    },

    deletedAt: {
        type: dataTypes.DATE
    }

}

let config = {
    tableName : "usuarios",
    timestamps:true,
    underscored: false,
}

let Usuario = sequelize.define(alias, cols, config);


Usuario.associate = function (models) {
    Usuario.hasMany(models.Comentario, {
        as: "usuarios", 
        foreignKey: "usuarioId"
    }); // asocio el usuario con los comentarios ya que un usuario puede comentar muchas veces 
    Usuario.hasMany(models.Producto, {
        as: "productos", 
        foreignKey: "usuarioId"
    }) //asocio el usuario con los productos ya que un usuario puede tener muchos productos
}; 


    return Usuario; 


}