const { criarOuAtualizar, pegarDados } = require("../../utils");

module.exports = {
  async verificarEmpresa(requisicao, resposta, proximo) {
    console.log(requisicao.body.cnpj);
    if (!requisicao.body.cnpj) {
      return resposta.status(400).send({ erro: "A empresa não é verídica!" });
    }
    console.log("Essa empresa é véridica!");
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

    if (empresas.length > 0) {
    }

    if (!empresas) {
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
};
