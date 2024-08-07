const {
  TipoMascotas,
  Mascotas,
  Usuarios,
} = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");

// Obtener todas las mascotas
const getAllPets = async (req, res) => {
  try {
    const mascotas = await Mascotas.findAll({
      where: {
        estadoMascota: {
          [Op.ne]: "Eliminada", // Solo seleccionar mascotas que no estén eliminadas
        },
      },
      include: [
        {
          model: Usuarios,
          attributes: [
            "nombreUsuario",
            "apellidoUsuario",
            "UbicacionUsuario",
            "telefonoUsuario",
          ],
        },
        { model: TipoMascotas, attributes: ["nombre"] },
      ],
    });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mascotas" });
  }
};

// Obtener una mascota por ID
const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await Mascotas.findOne({
      where: {
        idMascota: id,
        estadoMascota: {
          [Op.ne]: "Eliminada", // Solo seleccionar si la mascota no está eliminada
        },
      },
      include: [
        { model: Usuarios, attributes: ["nombreUsuario"] },
        { model: TipoMascotas, attributes: ["nombre"] },
      ],
    });
    if (mascota) {
      res.json(mascota);
    } else {
      res.status(404).json({ error: "Mascota no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la mascota" });
  }
};

// Crear una mascota
const createPet = async (req, res) => {
  const {
    nombreMascota,
    fechaNacimiento,
    sexo,
    idTipoMascota,
    idUsuario,
    descripcion,
    imageMascota,
  } = req.body;

  try {
    const usuario = await Usuarios.findByPk(idUsuario);
    const tipoMascota = await TipoMascotas.findByPk(idTipoMascota);

    if (!usuario || !tipoMascota) {
      return res
        .status(400)
        .json({ error: "Usuario o Tipo de Mascota no válido" });
    }

    const nuevaMascota = await Mascotas.create({
      nombreMascota,
      fechaNacimiento,
      sexo,
      idTipoMascota,
      idUsuario,
      descripcion,
      imageMascota,
      estadoMascota: "Agregada", // Asegúrate de establecer el estado inicial
    });
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la mascota" });
  }
};

// Actualizar una mascota
const updatePet = async (req, res) => {
  const { id } = req.params;
  const {
    nombreMascota,
    fechaNacimiento,
    sexo,
    idTipoMascota,
    idUsuario,
    descripcion,
    imageMascota,
  } = req.body;

  try {
    const mascota = await Mascotas.findByPk(id);

    if (!mascota) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    await Mascotas.update(
      {
        nombreMascota,
        fechaNacimiento,
        sexo,
        idTipoMascota,
        idUsuario,
        descripcion,
        imageMascota,
      },
      { where: { idMascota: id } }
    );

    res.json({ message: "Mascota actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mascota" });
  }
};

// Eliminar una mascota (cambio de estado)
const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await Mascotas.findByPk(id);
    if (!mascota) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    await Mascotas.update(
      { estadoMascota: "Eliminada" },
      { where: { idMascota: id } }
    );

    res.json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la mascota" });
  }
};

module.exports = {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
};
