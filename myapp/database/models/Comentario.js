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

        created_at: {
            type: dataTypes.DATE
    
        },
    
        updated_at:{
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
        underscored: true,
    }
    
    let Comentario = sequelize.define(alias, cols, config);
    

    Comentario.associate = function (models) {
        Comentario.belongsTo(models.Usuario, {
            as: "usuarios", 

            foreignKey: "usuarios_id"
        })
    }

    return Comentario;

}