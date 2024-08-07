const express = require("express");
const router = express.Router();
const enfermedadesController = require("../controller/enfermedades.controller");

router.get("/enfermedades/", enfermedadesController.obtenerEnfermedades);
router.get("/enfermedades/:id", enfermedadesController.obtenerEnfermedadPorId);
router.post("/enfermedades/", enfermedadesController.crearEnfermedad);
router.patch("/enfermedades/:id", enfermedadesController.actualizarEnfermedad);
router.delete("/enfermedades/:id", enfermedadesController.eliminarEnfermedad);

module.exports = router;
