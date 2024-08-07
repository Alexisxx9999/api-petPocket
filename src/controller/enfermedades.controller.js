const { Enfermedades } = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");

// Obtener todas las enfermedades
const obtenerEnfermedades = async (req, res) => {
  try {
    const enfermedades = await Enfermedades.findAll({
    
    });
    res.json(enfermedades);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las enfermedades" });
  }
};

// Obtener una enfermedad por ID
const obtenerEnfermedadPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const enfermedad = await Enfermedades.findByPk(id);
    if (enfermedad) {
      res.json(enfermedad);
    } else {
      res.status(404).json({ error: "Enfermedad no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la enfermedad" });
  }
};

// Crear una enfermedad
const crearEnfermedad = async (req, res) => {
  const { nombreEnfermedad } = req.body;
  try {
    const nuevaEnfermedad = await Enfermedades.create({ nombreEnfermedad });
    res.status(201).json(nuevaEnfermedad);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la enfermedad" });
  }
};

// Actualizar una enfermedad
const actualizarEnfermedad = async (req, res) => {
  const { id } = req.params;
  const { nombreEnfermedad } = req.body;
  try {
    const enfermedad = await Enfermedades.findByPk(id);
    if (!enfermedad) {
      return res.status(404).json({ error: "Enfermedad no encontrada" });
    }

    await Enfermedades.update(
      { nombreEnfermedad },
      { where: { idEnfermedad: id } }
    );

    res.json({ message: "Enfermedad actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la enfermedad" });
  }
};

// Eliminar una enfermedad (cambio de estado)
const eliminarEnfermedad = async (req, res) => {
  const { id } = req.params;
  try {
    const enfermedad = await Enfermedades.findByPk(id);
    if (!enfermedad) {
      return res.status(404).json({ error: "Enfermedad no encontrada" });
    }

    // En lugar de eliminar físicamente el registro, puedes marcarlo como eliminado
    // Aquí se asume que hay un campo `estado` para la eliminación lógica
    // await Enfermedades.update(
    //   { estado: 'Eliminado' },
    //   { where: { idEnfermedad: id } }
    // );

    // Si deseas eliminar físicamente el registro, usa:
    await Enfermedades.destroy({ where: { idEnfermedad: id } });

    res.json({ message: "Enfermedad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la enfermedad" });
  }
};

module.exports = {
  obtenerEnfermedades,
  obtenerEnfermedadPorId,
  crearEnfermedad,
  actualizarEnfermedad,
  eliminarEnfermedad,
};
