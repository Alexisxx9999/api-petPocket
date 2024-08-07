const tipoMascotas = (sequelize, type) => {
  return sequelize.define(
    "tipoMascotas",
    {
      idTipoMascota: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "id tipo de mascota",
      },
      nombre: {
        type: type.STRING,
        comment: "nombre del tipo de mascota",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de tipo de mascota",
    }
  );
};

module.exports = tipoMascotas;
