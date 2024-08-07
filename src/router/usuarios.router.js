const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuarios.controller");

// Rutas para mascotas
router.get("/usuarios/", usuariosController.getAllUser);
router.get("/usuarios/:id", usuariosController.getUser);
router.post("/usuarios/", usuariosController.createUser);
router.patch("/usuarios/:id", usuariosController.updateUser);
router.delete("/usuarios/:id", usuariosController.deleteUser);

module.exports = router;
