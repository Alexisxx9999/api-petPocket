const historialMedico = (sequelize, type) => {
  return sequelize.define(
    "historialMedico",
    {
      idHistorial: {
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
      especialidad: {
        type: type.STRING,
        comment: "servicio de la mascota",
      },
      diagnostico: {
        type: type.STRING,
        comment: "diagnostico de la mascota",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de historial medico",
    }
  );
};

module.exports = historialMedico;
