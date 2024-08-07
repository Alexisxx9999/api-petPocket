const express = require("express");
const router = express.Router();
const historialController = require("../controller/historialMedico.controller");

router.get("/historiales/", historialController.getAllHistorial);
router.get("/historiales/:id", historialController.getHistorial);
router.post("/historiales/", historialController.createHistorial);
router.patch("/historiales/:id", historialController.updateHistorial);
router.delete("/historiales/:id", historialController.deleteHistorial);

module.exports = router;
