// modelos/mascotas.js
const { Sequelize } = require("sequelize");

const mascotas = (sequelize, type) => {
  return sequelize.define(
    "mascotas",
    {
      idMascota: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "id de la mascota",
      },
      nombreMascota: {
        type: type.STRING,
        comment: "nombre de la mascota",
      },
      fechaNacimiento: {
        type: type.DATE,
        comment: "fecha de nacimiento de la mascota",
      },
      sexo: {
        type: type.STRING,
        comment: "sexo de la mascota",
      },
      idTipoMascota: {
        type: type.INTEGER,
        references: {
          model: "tipoMascotas",
          key: "idTipoMascota",
        },
        comment: "especie de la mascota",
      },

      idUsuario: {
        type: type.INTEGER,
        comment: "dueño de la mascota",
        references: {
          model: "usuarios",
          key: "idUsuario",
        },
      },
      descripcion: {
        type: type.STRING,
        comment: "descripcion de la mascota",
      },
      createMascota: {
        type: type.DATE,
        defaultValue: Sequelize.NOW,
      },
      estadoMascota: {
        type: type.STRING,
        comment: "estado de la mascota",
        defaultValue: "Agregada",
      },
      imageMascota: {
        type: type.STRING,
        comment: "imagen de la mascota",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de mascotas",
    }
  );
};

module.exports = mascotas;
