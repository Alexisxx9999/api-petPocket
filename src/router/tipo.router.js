const express = require("express");
const router = express.Router();
const tipoMascotasController = require("../controller/tipo.controller");

router.get("/tipoMascotas", tipoMascotasController.obtenerTiposDeMascotas);
router.get(
  "/tipoMascotas/:id",
  tipoMascotasController.obtenerTipoDeMascotaPorId
);
router.post("/tipoMascotas/", tipoMascotasController.crearTipoDeMascota);
router.patch(
  "/tipoMascotas/:id",
  tipoMascotasController.actualizarTipoDeMascota
);
router.delete(
  "/tipoMascotas/:id",
  tipoMascotasController.eliminarTipoDeMascota
);

module.exports = router;
