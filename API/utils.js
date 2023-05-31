const fs = require("fs");

function criarOuAtualizar(nomeDoArquivo, dados) {
  try {
    fs.writeFileSync("" + nomeDoArquivo, JSON.stringify(dados));
  } catch (error) {
    throw error;
  }
}

function pegarDados(nomeDoArquivo) {
  try {
    const resultadoDaBusca = JSON.parse(
      fs.readFileSync("" + nomeDoArquivo, "utf8")
    );
    return resultadoDaBusca;
  } catch (error) {
    return null;
  }
}

module.exports = {
  criarOuAtualizar,
  pegarDados,
};
