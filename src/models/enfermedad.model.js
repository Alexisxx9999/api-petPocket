// Database/models/enfermedades.js
const enfermedades = (sequelize, type) => {
  return sequelize.define(
    "enfermedades",
    {
      idEnfermedad: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "ID de la enfermedad",
      },
      nombreEnfermedad: {
        type: type.STRING,
        comment: "Nombre de la enfermedad",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de enfermedades",
    }
  );
};

module.exports = enfermedades;
