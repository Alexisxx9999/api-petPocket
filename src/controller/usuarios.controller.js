const { Usuarios } = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");

// Obtener todas las usuarios
const getAllUser = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({
      where: {
        estadoUsuario: {
          [Op.ne]: "eliminado", // Solo seleccionar usuarios que no estén eliminadas
        },
      },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener una usuarios por ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarios = await Usuarios.findByPk({
      where: {
        idUsuario: id,
        estadoUsuario: {
          [Op.ne]: "eliminado", // Solo seleccionar si la mascota no está eliminada
        },
      },
    });

    if (!usuarios) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la usuarios" });
  }
};

// Crear una nueva usuarios
const createUser = async (req, res) => {
  try {
    const {
      nombreUsuario,
      apellidoUsuario,
      emailUsuario,
      cedulaUsuario,
      telefonoUsuario,
      contraseñaUsuario,
      ubicacionUsuario,
      fotoUsuario,
      createUsuario,
    } = req.body;

    const newUser = {
      nombreUsuario,
      apellidoUsuario,
      emailUsuario,
      telefonoUsuario,
      ubicacionUsuario,
    };
    const nuevoUsuario = await Usuarios.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Actualizar una usuarios por ID
const updateUser = async (req, res) => {
  try {
    const {
      nombreUsuario,
      apellidoUsuario,
      emailUsuario,
      cedulaUsuario,
      telefonoUsuario,
      contraseñaUsuario,
      ubicacionUsuario,
      fotoUsuario,
    } = req.body;
    const { id } = req.params;

    const [actualizado] = await Usuarios.update(req.body, {
      where: { idUsuario: id },
    });

    if (!actualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuariosActualizada = await Usuarios.findByPk(id);
    res.json(usuariosActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuarios" });
  }
};

// Eliminar una usuarios por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Usuarios.update(
      { estadoUsuario: "eliminado" },
      {
        where: { idUsuario: id },
      }
    );

    if (!eliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(204).json({
      msg: "usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Usuario" });
  }
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
