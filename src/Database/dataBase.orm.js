const { Sequelize } = require("sequelize");
const {
  MYSQLHOST,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDATABASE,
  MYSQLPORT,
  MYSQL_URI,
} = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
  sequelize = new Sequelize(MYSQL_URI);
} else {
  // Configuración para parámetros individuales
  sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
    host: MYSQLHOST,
    port: MYSQLPORT,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  });
}

// Autenticar y sincronizar
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con la base de datos");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err.message);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err.message);
  });

//extracionModelos
const userModel = require("../models/user.model");
const mascotasModel = require("../models/mascotas.model");
const vacunasModel = require("../models/vacunas.model");
const adopcionesModel = require("../models/adopciones.model");
const historialModel = require("../models/historialMedico.model");
const tipoMascotasModel = require("../models/tipoMascota.model");
const enfermedadesModel = require("../models/enfermedad.model");
const usuariosModel = require("../models/usuarios.model");

//zincronia tablas
/* const user = userModel(sequelize, Sequelize); */
const Mascotas = mascotasModel(sequelize, Sequelize);
const Vacunas = vacunasModel(sequelize, Sequelize);
const Adopciones = adopcionesModel(sequelize, Sequelize);
const HistorialMedico = historialModel(sequelize, Sequelize);
const TipoMascotas = tipoMascotasModel(sequelize, Sequelize);
const Enfermedades = enfermedadesModel(sequelize, Sequelize);
const Usuarios = usuariosModel(sequelize, Sequelize);

TipoMascotas.hasMany(Mascotas, { foreignKey: "idTipoMascota" });
Mascotas.belongsTo(TipoMascotas, { foreignKey: "idTipoMascota" });

Usuarios.hasMany(Mascotas, { foreignKey: "idUsuario" });
Mascotas.belongsTo(Usuarios, { foreignKey: "idUsuario" });

Mascotas.hasMany(Vacunas, { foreignKey: "idMascota" });
Vacunas.belongsTo(Mascotas, { foreignKey: "idMascota" });

Enfermedades.hasMany(Vacunas, { foreignKey: "idEnfermedad" });
Vacunas.belongsTo(Enfermedades, { foreignKey: "idEnfermedad" });

Mascotas.hasOne(Adopciones, { foreignKey: "idMascota" });
Adopciones.belongsTo(Mascotas, { foreignKey: "idMascota" });

Mascotas.hasMany(HistorialMedico, { foreignKey: "idMascota" });
HistorialMedico.belongsTo(Mascotas, { foreignKey: "idMascota" });

Usuarios.hasMany(Adopciones, { foreignKey: "idUsuario" });
Adopciones.belongsTo(Usuarios, { foreignKey: "idUsuario" });

/*  */
sequelize
  .sync({ alter: true }) // alter will update the database schema to match the model
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

// Exportar el objeto sequelize
module.exports = {
  Mascotas,
  Adopciones,
  Enfermedades,
  Vacunas,
  HistorialMedico,
  TipoMascotas,
  Usuarios,
  sequelize,
};
