const { criarOuAtualizar, pegarDados } = require("../../utils");
const { writeFileSync } = require("fs");

module.exports = {
  async verificarEmpresa(requisicao, resposta, proximo) {
    if (!requisicao.body.cnpj) {
      return resposta.status(400).send({ erro: "A empresa não é verídica!" });
    }

    proximo();
  },

  async criarEmpresa(requisicao, resposta) {
    const { cnpj, nomeFantasia, dataDeCriacao } = requisicao.body;

    if (!cnpj || !nomeFantasia || !dataDeCriacao) {
      return resposta
        .status(400)
        .send({ mensagem: "Todos os campos são obrigatórios" });
    }

    if (
      typeof cnpj !== "string" ||
      typeof nomeFantasia !== "string" ||
      typeof dataDeCriacao !== "string"
    ) {
      return resposta
        .status(400)
        .send({ mensagem: "Todos os campos devem estar na tipagem correta" });
    }

    const empresas = pegarDados("src/database/empresas.json");

    if (!empresas) {
      criarOuAtualizar("src/database/empresas.json", [
        { cnpj, nomeFantasia, dataDeCriacao },
      ]);

      return resposta.status(200).send({
        mensagem: "Criou uma empresa!",
        dados: pegarDados("src/database/empresas.json"),
      });
    }

    const totalDeEmpresas = [
      ...empresas,
      {
        cnpj,
        nomeFantasia,
        dataDeCriacao,
      },
    ];

    criarOuAtualizar("src/database/empresas.json", totalDeEmpresas);
    return resposta
      .status(200)
      .send({ mensagem: "Criou e atualizou as empresas" });
  },

  async listarEmpresa(requisicao, resposta) {
    const { busca } = requisicao.query; // Busca é o nome da empresa que o usuário vai digitar na url
    const empresas = pegarDados("src/database/empresas.json"); // Array de empresas

    // Se não existir empresas ou se o array estiver vazio deve retornar 204
    if (!empresas || empresas.length === 0) {
      return resposta.status(204).send();
    }

    const existeDadosValidos = Object.keys(empresas[0]).some((propriedade) => {
      return (
        propriedade === "cnpj" ||
        propriedade === "nomeFantasia" ||
        propriedade === "dataDeCriacao"
      );
    });

    if (!existeDadosValidos) {
      return resposta.status(204).send();
    }

    if (!busca) {
      return resposta.status(200).send({ mensagem: "Lista", dados: empresas });
    }

    const empresasFiltradas = empresas.filter(({ nomeFantasia }) =>
      nomeFantasia.includes(busca)
    );

    return resposta
      .status(200)
      .send({ mensagem: "Lista", dados: empresasFiltradas });
  },

  async atualizarEmpresa(requisicao, resposta) {
    const { cnpj } = requisicao.params; //pegando o cnpj da url
    const { nomeFantasia, dataDeCriacao } = requisicao.body; //pegando o nomeFantasia e dataDeCriacao do body
    const empresas = pegarDados("src/database/empresas.json"); //pegando os dados do json

    if (!empresas) {
      //verifica se existe empresas
      return resposta
        .status(400)
        .send({ mensagem: "Não há empresas para serem atualizadas" });
    }

    const existeCnpj = empresas.some((empresa) => empresa.cnpj === cnpj); //verifica se existe o cnpj

    if (!existeCnpj) {
      //se não existir o cnpj
      return resposta
        .status(400)
        .send({ mensagem: `CNPJ: ${cnpj}  não encontrado` });
    } //se existir o cnpj

    const alterarDadosDaEmpresa = empresas.map((empresa) => {
      if (empresa.cnpj === cnpj) {
        return {
          cnpj: empresa.cnpj,
          nomeFantasia: nomeFantasia ? nomeFantasia : empresa.nomeFantasia,
          dataDeCriacao: dataDeCriacao ? dataDeCriacao : empresa.dataDeCriacao,
        };
      }
      return empresa;
    });

    criarOuAtualizar("src/database/empresas.json", alterarDadosDaEmpresa);
    return resposta.status(200).send({ mensagem: "Atualizou a empresa!" });
  },

  async excluirEmpresa(requisicao, resposta) {
    const { cnpj } = requisicao.params;
    const empresas = pegarDados("src/database/empresas.json");

    if (!empresas) {
      return resposta
        .status(400)
        .send({ mensagem: "Não há empresas para serem excluídas" });
    }

    const existeCnpj = empresas.some((empresa) => empresa.cnpj === cnpj); //verifica se existe o cnpj

    if (!existeCnpj) {
      //se não existir o cnpj
      return resposta
        .status(400)
        .send({ mensagem: `CNPJ: ${cnpj}  não encontrado` });
    } //se existir o cnpj

    const empresasFiltradas = empresas.filter(
      (empresa) => empresa.cnpj !== cnpj
    );
    criarOuAtualizar("src/database/empresas.json", empresasFiltradas);

    return resposta.status(200).send({ mensagem: "Excluiu a empresa!" });
  },

  async salvarImagem(requisicao, resposta) {
    const { originalname, buffer } = requisicao.file;
    writeFileSync(originalname, buffer);
    return resposta.status(200).send({ mensagem: "Imagem salva!" });
  },
};
