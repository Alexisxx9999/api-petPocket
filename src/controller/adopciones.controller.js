const {
  Adopciones,
  Mascotas,
  Usuarios,
} = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");


// Obtener todas las adopciones
const getAllAdopciones = async (req, res) => {
  try {
    const adopciones = await Adopciones.findAll({
      where: {
        estadoAdopcion: {
          [Op.ne]: "Eliminada", // Solo seleccionar mascotas que no estén eliminadas
        },
      },
      include: [
        { model: Mascotas, attributes: ["nombreMascota"] },
        { model: Usuarios, attributes: ["nombreUsuario"] },
      ],
    });
    res.json(adopciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las adopciones" });
  }
};

// Obtener una adopción por ID
const getAdopcion = async (req, res) => {
  const { id } = req.params;
  try {
    const adopcion = await Adopciones.findByPk(id, {
      where: {
        idAdopcion: id,
        estadoAdopcion: {
          [Op.ne]: "Eliminada", // Solo seleccionar si la mascota no está eliminada
        },
      },
      include: [
        { model: Mascotas, attributes: ["nombreMascota"] },
        { model: Usuarios, attributes: ["nombreUsuario"] },
      ],
    });
    if (adopcion) {
      res.json(adopcion);
    } else {
      res.status(404).json({ error: "Adopción no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la adopción" });
  }
};

// Crear una adopción
const createAdopcion = async (req, res) => {
  const { idMascota, idUsuario, descripcion } = req.body;

  try {
    const mascota = await Mascotas.findByPk(idMascota);
    const usuario = await Usuarios.findByPk(idUsuario);

    if (!mascota || !usuario) {
      return res.status(400).json({ error: "Mascota o Usuario no válido" });
    }

    const nuevaAdopcion = await Adopciones.create({
      idMascota,
      idUsuario,
      descripcion,
    });

    res.status(201).json(nuevaAdopcion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la adopción" });
  }
};

// Actualizar una adopción
const updateAdopcion = async (req, res) => {
  const { id } = req.params;
  const { idMascota, idUsuario, descripcion } = req.body;

  try {
    const adopcion = await Adopciones.findByPk(id);

    if (!adopcion) {
      return res.status(404).json({ error: "Adopción no encontrada" });
    }

   /*  const mascota = await Mascotas.findByPk(idMascota);
    const usuario = await Usuarios.findByPk(idUsuario);

    if (!mascota || !usuario) {
      return res.status(400).json({ error: "Mascota o Usuario no válido" });
    }
 */
    await Adopciones.update(
      { idMascota, idUsuario, descripcion },
      { where: { idAdopcion: id } }
    );

    res.json({ message: "Adopción actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la adopción" });
  }
};

// Eliminar una adopción (cambio de estado)
const deleteAdopcion = async (req, res) => {
  const { id } = req.params;
  try {
    const adopcion = await Adopciones.findByPk(id);

    if (!adopcion) {
      return res.status(404).json({ error: "Adopción no encontrada" });
    }

    await Adopciones.update(
      { estadoAdopcion: "Eliminada" },
      { where: { idAdopcion: id } }
    );

    res.json({ message: "Adopción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la adopción" });
  }
};

module.exports = {
  getAllAdopciones,
  getAdopcion,
  createAdopcion,
  updateAdopcion,
  deleteAdopcion,
};
