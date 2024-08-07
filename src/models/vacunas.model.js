// Database/models/vacunas.js
const { Sequelize } = require("sequelize");

const vacunas = (sequelize, type) => {
  return sequelize.define(
    "vacunas",
    {
      idVacuna: {
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
        allowNull: false,
      },
     
      idEnfermedad: {
        type: type.INTEGER,
        references: {
          model: "enfermedades",
          key: "idEnfermedad",
        },
        allowNull: false, // No permitir valores nulos
        comment: "ID de la enfermedad",
      },
      descripcion: {
        type: type.STRING,
        comment: "Descripción de la vacuna",
      },
      createVacuna: {
        type: type.DATE,
        defaultValue: Sequelize.NOW,
      },
      estadoVacuna: {
        type: type.STRING,
        comment: "estado de la mascota",
        defaultValue: "Agregado",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de vacunas",
    }
  );
};

module.exports = vacunas;
