const { Sequelize } = require("sequelize");
const adopciones = (sequelize, type) => {
  return sequelize.define(
    "adopciones",
    {
      idAdopcion: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Campo único de la vacuna",
      },
      idMascota: {
        type: type.INTEGER,
        comment: "id de la mascota",
        references: {
          model: "mascotas",
          key: "idMascota",
        },
      },
     
      idUsuario: {
        type: type.INTEGER,
        comment: "id del usuario",
        references: {
          model: "usuarios",
          key: "idUsuario",
        },
      },

      descripcion: {
        type: type.STRING,
        comment: "Descripción de la mascota",
      },
      createAdopcion: {
        type: type.DATE,
        defaultValue: Sequelize.NOW,
      },
      estadoAdopcion: {
        type: type.STRING,
        defaultValue: "Agregado",
        comment: "estado de la adopcion",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de adopciones",
    }
  );
};

module.exports = adopciones;
