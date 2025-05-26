module.exports = function (sequelize, dataTypes){
    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement: true, 
            primaryKey: true, 
            type: dataTypes.INTEGER
    
        }, 

        comentario: {
            type: dataTypes.TEXT
        }, 

        createdAt: {
            type: dataTypes.DATE
    
        },
    
        updatedAt:{
            type: dataTypes.DATE
    
        },

        deletedAt: {
            type: dataTypes.DATE
        }, 

        usuarioId: {
            type: dataTypes.INTEGER
        }, 

        productoId: {
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName : "comentarios",
        timestamps:true,
        underscored: false,
    }
    
    let Comentario = sequelize.define(alias, cols, config);
    

    Comentario.associate = function (models) {
        Comentario.belongsTo(models.Usuario, {
            as: "usuario", 
            foreignKey: "usuarioId"
        }); // asocio el comentario con el usuario ya que un comentario pertenece a un usuario
        Comentario.belongsTo(models.Producto, {
            as: "producto", 
            foreignKey: "productoId"
        }); 
    }

    return Comentario;

}