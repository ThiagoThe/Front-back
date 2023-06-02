const fs = require("fs");

function validaEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

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

function gerarID() {
  const timestamp = Date.now(); // Obtém o timestamp em milissegundos
  const random = Math.floor(Math.random() * 1000); // Gera um número aleatório entre 0 e 999

  return `${timestamp}${random}`; // Concatena o timestamp com o número aleatório
}

module.exports = {
  criarOuAtualizar,
  pegarDados,
  validaEmail,
  gerarID,
};
