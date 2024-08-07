const { Sequelize } = require("sequelize");

const usuarios = (sequelize, type) => {
  return sequelize.define(
    "usuarios",
    {
      idUsuario: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Campo unico de usuario",
      },
      nombreUsuario: {
        type: type.STRING,
        comment: "Nombre completo de usuario",
      },
      apellidoUsuario: {
        type: type.STRING,
        comment: "Apellidos completos del usuario",
      },
      emailUsuario: {
        type: type.STRING,
        comment: "Correo de usuario",
      },
      cedulaUsuario: {
        type: type.STRING,
        comment: "Cédula de usuario",
      },
      telefonoUsuario: {
        type: type.STRING,
        comment: "Celular de usuario",
      },
      contraseñaUsuario: {
        type: type.STRING,
        comment: "Contraseña de usuario",
      },
      ubicacionUsuario: {
        type: type.STRING,
        comment: "Ubicación del usuario",
      },
      rolUsuario: {
        type: type.STRING,
        comment: "Rol de usuario",
      },
      createUsuario: {
        type: type.DATE,
        comment: "Creación del usuario",
        defaultValue: Sequelize.NOW,
      },
      fotoUsuario: {
        type: type.STRING,
        comment: "Foto de usuario",
      },
      estadoUsuario: {
        type: type.STRING,
        comment: "Estado del usuario",
        defaultValue: "Agregado",
      },
    },
    {
      timestamps: false,
      comment: "Tabla de usuarios",
    }
  );
};

module.exports = usuarios;
