const {
  criarOuAtualizar,
  pegarDados,
  validaEmail,
  gerarID,
} = require("../../utils");

module.exports = {
  async criarUsuario(req, res) {
    const { nome, idade, email } = req.body;
    const id = gerarID();
    console.log(id);
    if (!nome || !idade || !email) {
      return res
        .status(400)
        .json({ mensagem: "O campo nome, idade e email são obrigatórios" });
    }

    if (
      typeof nome !== "string" ||
      typeof idade !== "number" ||
      typeof email !== "string"
    ) {
      return res.status(400).json({
        mensagem: "O campo nome e email precisam ser uma string e idade número",
      });
    }

    if (!validaEmail(email)) {
      return res
        .status(400)
        .json({ mensagem: "O campo email precisa ser um email válido" });
    }

    const usuarios = pegarDados("src/database/usuarios.json");

    if (!usuarios) {
      criarOuAtualizar("src/database/usuarios.json", [
        { id, nome, idade, email },
      ]);

      return res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        dados: pegarDados("src/database/usuarios.json"),
      });
    }

    const totalDeUsuarios = [...usuarios, { id, nome, idade, email }];

    criarOuAtualizar("src/database/usuarios.json", totalDeUsuarios);
    return res.status(201).send({ mensagem: "Usuário criado com sucesso" });
  },

  async listarUsuario(req, res) {
    const { busca } = req.query;
    const usuarios = pegarDados("src/database/usuarios.json");

    if (usuarios.length > 0) {
    }
    if (!usuarios) {
      return res.status(204).send();
    }

    const existeUsuarios = Object.keys(usuarios).some((propriedade) => {
      return (
        propriedade === "id" ||
        propriedade === "nome" ||
        propriedade === "idade" ||
        propriedade === "email"
      );
    });

    if (!existeUsuarios) {
      return res.status(204).send();
    }

    if (!busca) {
      return res.status(200).send({ mensagem: "lista", dados: usuarios });
    }

    const usuariosFiltrados = usuarios.filter((id) => id.includes(busca));

    return resposta
      .status(200)
      .send({ mensagem: "lista", dados: usuariosFiltrados });
  },
};
