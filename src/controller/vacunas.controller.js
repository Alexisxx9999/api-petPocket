const {
  Vacunas,
  Mascotas,
  Enfermedades,
} = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");

// Obtener todas las vacunas
const getAllVacunas = async (req, res) => {
  try {
    const vacunas = await Vacunas.findAll({
      where: {
        estadoVacuna: {
          [Op.ne]: "eliminada", // Solo seleccionar mascotas que no estén eliminadas
        },
      },
      include: [
        { model: Mascotas, attributes: ["nombreMascota", "sexo"] },
        {
          model: Enfermedades,
          attributes: ["nombreEnfermedad"],
        },
      ],
    });
    res.json(vacunas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las vacunas" });
  }
};

// Obtener una vacuna por ID
const getVacuna = async (req, res) => {
  const { id } = req.params;
  try {
    const vacuna = await Vacunas.findByPk({
      where: {
        idVacuna: id,
        estadoVacuna: {
          [Op.ne]: "eliminada", // Solo seleccionar si la mascota no está eliminada
        },
      },
      include: [
        { model: Mascotas, attributes: ["idMascota", "nombreMascota"] },
        {
          model: Enfermedades,
          attributes: ["idEnfermedad", "nombreEnfermedad"],
        },
      ],
    });
    if (vacuna) {
      res.json(vacuna);
    } else {
      res.status(404).json({ error: "Vacuna no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la vacuna" });
  }
};

// Crear una vacuna
const createVacuna = async (req, res) => {
  const { idMascota, idEnfermedad, descripcion } = req.body;
  try {
    // Validar que exista la mascota
    const mascota = await Mascotas.findByPk(idMascota);
    if (!mascota) {
      return res.status(400).json({ error: "Mascota no encontrada" });
    }

    // Validar que exista la enfermedad
    const enfermedad = await Enfermedades.findByPk(idEnfermedad);
    if (!enfermedad) {
      return res.status(400).json({ error: "Enfermedad no encontrada" });
    }

    const nuevaVacuna = await Vacunas.create({
      idMascota,
      idEnfermedad,
      descripcion,
    });

    res.status(201).json(nuevaVacuna);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la vacuna" });
  }
};

// Actualizar una vacuna
const updateVacuna = async (req, res) => {
  const { id } = req.params;
  const { idMascota, idEnfermedad, descripcion, estadoVacuna } = req.body;
  try {
    // Validar que exista la vacuna
    const vacuna = await Vacunas.findByPk(id);
    if (!vacuna) {
      return res.status(404).json({ error: "Vacuna no encontrada" });
    }

    // Validar que exista la mascota si se proporciona un nuevo idMascota
    /* if (idMascota) {
      const mascota = await Mascotas.findByPk(idMascota);
      if (!mascota) {
        return res.status(400).json({ error: "Mascota no encontrada" });
      }
    }

    // Validar que exista la enfermedad si se proporciona un nuevo idEnfermedad
    if (idEnfermedad) {
      const enfermedad = await Enfermedades.findByPk(idEnfermedad);
      if (!enfermedad) {
        return res.status(400).json({ error: "Enfermedad no encontrada" });
      }
    } */

    // Actualizar la vacuna
    await Vacunas.update(
      { idMascota, idEnfermedad, descripcion, estadoVacuna },
      { where: { idVacuna: id } }
    );

    res.json({ message: "Vacuna actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la vacuna" });
  }
};

// Eliminar una vacuna (cambio de estado)
const deleteVacuna = async (req, res) => {
  const { id } = req.params;
  try {
    const vacuna = await Vacunas.findByPk(id);
    if (!vacuna) {
      return res.status(404).json({ error: "Vacuna no encontrada" });
    }

    await Vacunas.update(
      { estadoVacuna: "eliminada" },
      { where: { idVacuna: id } }
    );

    res.json({ message: "Vacuna eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la vacuna" });
  }
};

module.exports = {
  getAllVacunas,
  getVacuna,
  createVacuna,
  deleteVacuna,
  updateVacuna,
};
