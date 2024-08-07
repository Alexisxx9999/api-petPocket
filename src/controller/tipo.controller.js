const { TipoMascotas } = require("../Database/dataBase.orm.js");
const { Op } = require("sequelize");

// Obtener todos los tipos de mascotas
const obtenerTiposDeMascotas = async (req, res) => {
  try {
    const tiposMascotas = await TipoMascotas.findAll();
    res.json(tiposMascotas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos de mascotas" });
  }
};

// Obtener un tipo de mascota por ID
const obtenerTipoDeMascotaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoMascota = await TipoMascotas.findByPk(id);
    if (tipoMascota) {
      res.json(tipoMascota);
    } else {
      res.status(404).json({ error: "Tipo de mascota no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tipo de mascota" });
  }
};

// Crear un tipo de mascota
const crearTipoDeMascota = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevoTipoMascota = await TipoMascotas.create({ nombre });
    res.status(201).json(nuevoTipoMascota);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el tipo de mascota" });
  }
};

// Actualizar un tipo de mascota
const actualizarTipoDeMascota = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const tipoMascota = await TipoMascotas.findByPk(id);
    if (!tipoMascota) {
      return res.status(404).json({ error: "Tipo de mascota no encontrado" });
    }

    await TipoMascotas.update({ nombre }, { where: { idTipoMascota: id } });

    res.json({ message: "Tipo de mascota actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tipo de mascota" });
  }
};

// Eliminar un tipo de mascota (eliminación lógica)
const eliminarTipoDeMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoMascota = await TipoMascotas.findByPk(id);
    if (!tipoMascota) {
      return res.status(404).json({ error: "Tipo de mascota no encontrado" });
    }

    // En lugar de eliminar físicamente el registro, puedes marcarlo como eliminado
    // Aquí se asume que hay un campo `estado` para la eliminación lógica
    // await TipoMascotas.update(
    //   { estado: 'Eliminado' },
    //   { where: { idTipoMascota: id } }
    // );

    // Si deseas eliminar físicamente el registro, usa:
    await TipoMascotas.destroy({ where: { idTipoMascota: id } });

    res.json({ message: "Tipo de mascota eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tipo de mascota" });
  }
};

module.exports = {
  obtenerTiposDeMascotas,
  obtenerTipoDeMascotaPorId,
  crearTipoDeMascota,
  actualizarTipoDeMascota,
  eliminarTipoDeMascota,
};
