const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', 
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true,  
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },



  {//SE PUEDE SACAR O VOLVER A PONER ESTOS ATRIBUTOS QUE VIENEN POR DEFECTO
    createdAt: false,
    updatedAt: false,
  });
};
