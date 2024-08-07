const express = require("express");
const router = express.Router();
const adopcionesController = require("../controller/adopciones.controller");

router.get("/adopciones/", adopcionesController.getAllAdopciones);
router.get("/adopciones/:id", adopcionesController.getAdopcion);
router.post("/adopciones/", adopcionesController.createAdopcion);
router.patch("/adopciones/:id", adopcionesController.updateAdopcion);
router.delete("/adopciones/:id", adopcionesController.deleteAdopcion);

module.exports = router;
