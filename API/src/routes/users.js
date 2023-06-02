const { Router } = require("express");
const rotasDeUsuario = Router();
const { criarUsuario, listarUsuario } = require("../controllers/users");

rotasDeUsuario.post("/criarUsuario", criarUsuario);
rotasDeUsuario.get("/listarUsuario", listarUsuario);

module.exports = rotasDeUsuario;
