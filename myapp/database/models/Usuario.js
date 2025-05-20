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

    created_at: {
        type: dataTypes.DATE

    },

    updated_at:{
        type: dataTypes.DATE

    },

    deletedAt: {
        type: dataTypes.DATE
    }

}

let config = {
    tableName : "usuarios",
    timestamps:true,
    underscored: true,
}

let Usuario = sequelize.define(alias, cols, config);


Usuario.associate = function (models) {
    Usuario.hasMany(models.Comentario, {
        as: "comentarios", 

        foreignKey: "comentarios_id"
    }) };

 Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, {
            as: "productos", 
    
            foreignKey: "productos_id"
        }) };


    return Usuario; 


}