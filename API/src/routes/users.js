const { Router } = require("express");
const rotasDeUsuario = Router();
const {
  criarUsuario,
  listarUsuario,
  atualizarUsuario,
} = require("../controllers/users");

rotasDeUsuario.post("/criarUsuario", criarUsuario);
rotasDeUsuario.get("/listarUsuario", listarUsuario);
rotasDeUsuario.patch("/atualizarUsuario/:id", atualizarUsuario);

module.exports = rotasDeUsuario;
