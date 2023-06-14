const { Router } = require("express");
const rotasDeUsuario = Router();
const {
  criarUsuario,
  listarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../controllers/users");

rotasDeUsuario.post("/criarUsuario", criarUsuario);
rotasDeUsuario.get("/listarUsuario", listarUsuario);
rotasDeUsuario.patch("/atualizarUsuario/:id", atualizarUsuario);
rotasDeUsuario.delete("/deletarUsuario/:id", deletarUsuario);

module.exports = rotasDeUsuario;
