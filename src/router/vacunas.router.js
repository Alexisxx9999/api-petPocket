const express = require("express");
const router = express.Router();
const vacunasController = require("../controller/vacunas.controller");

router.get("/vacunas/", vacunasController.getAllVacunas);
router.get("/vacunas/:id", vacunasController.getVacuna);
router.post("/vacunas/", vacunasController.createVacuna);
router.patch("/vacunas/:id", vacunasController.updateVacuna);
router.delete("/vacunas/:id", vacunasController.deleteVacuna);

module.exports = router;
