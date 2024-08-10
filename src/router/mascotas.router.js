const express = require("express");
const router = express.Router();
const mascotasController = require("../controller/mascotas.controller");
const { isLoggedIn } = require("../lib/auth");

// Rutas para mascotas
router.get("/mascotas/", mascotasController.getAllPets);
router.get("/mascotas/:id", mascotasController.getPet);
router.post("/mascotas/", mascotasController.createPet);
router.patch("/mascotas/:id", mascotasController.updatePet);
router.delete("/mascotas/:id", mascotasController.deletePet);

module.exports = router;
