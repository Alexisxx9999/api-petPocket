const { HistorialMedico, Mascotas } = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");

// Obtener todos los historiales médicos
const getAllHistorial = async (req, res) => {
  try {
    const historialesMedicos = await HistorialMedico.findAll({
    
      include: [
        { model: Mascotas, attributes: ["idMascota", "nombreMascota"] },
      ],
    });
    res.json(historialesMedicos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los historiales médicos" });
  }
};

// Obtener un historial médico por ID
const getHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    const historialMedico = await HistorialMedico.findByPk(id, {
      include: [
        { model: Mascotas, attributes: ["idMascota", "nombreMascota"] },
      ],
    });
    if (historialMedico) {
      res.json(historialMedico);
    } else {
      res.status(404).json({ error: "Historial médico no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial médico" });
  }
};

// Crear un historial médico
const createHistorial = async (req, res) => {
  const { idMascota, especialidad, diagnostico } = req.body;
  try {
    // Validar que exista la mascota
    const mascota = await Mascotas.findByPk(idMascota);
    if (!mascota) {
      return res.status(400).json({ error: "Mascota no encontrada" });
    }

    const nuevoHistorialMedico = await HistorialMedico.create({
      idMascota,
      especialidad,
      diagnostico,
    });

    res.status(201).json(nuevoHistorialMedico);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el historial médico" });
  }
};

// Actualizar un historial médico
const updateHistorial = async (req, res) => {
  const { id } = req.params;
  const { idMascota, especialidad, diagnostico } = req.body;
  try {
    // Validar que exista el historial médico
    const historialMedico = await HistorialMedico.findByPk(id);
    if (!historialMedico) {
      return res.status(404).json({ error: "Historial médico no encontrado" });
    }

    // Validar que exista la mascota si se proporciona un nuevo idMascota
    /*  if (idMascota) {
      const mascota = await Mascotas.findByPk(idMascota);
      if (!mascota) {
        return res.status(400).json({ error: "Mascota no encontrada" });
      }
    } */

    // Actualizar el historial médico
    await HistorialMedico.update(
      { idMascota, especialidad, diagnostico },
      { where: { idHistorial: id } }
    );

    res.json({ message: "Historial médico actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el historial médico" });
  }
};

// Eliminar un historial médico (cambio de estado)
const deleteHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    const historialMedico = await HistorialMedico.findByPk(id);
    if (!historialMedico) {
      return res.status(404).json({ error: "Historial médico no encontrado" });
    }

    await HistorialMedico.update(
      { estado: "Eliminado" }, // Se asume que hay un campo `estado` para la eliminación lógica
      { where: { idHistorial: id } }
    );

    res.json({ message: "Historial médico eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el historial médico" });
  }
};

module.exports = {
  getAllHistorial,
  getHistorial,
  createHistorial,
  updateHistorial,
  deleteHistorial,
};
