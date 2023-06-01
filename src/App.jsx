import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [lista, setLista] = useState([]);
  const [atualizarLista, setAtualizarLista] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const response = await axios.get("http://localhost:3333/listarEmpresa");
      setLista(response.data?.dados || []);
    };
    carregar();
  }, [atualizarLista]);

  async function cadastrarEmpresa(event) {
    event.preventDefault();

    const nome = event.target.nome.value;
    const cnpj = event.target.cnpj.value;
    const data = event.target.data.value;

    const response = await axios.post("http://localhost:3333/criarEmpresa", {
      nome,
      cnpj,
      data,
    });

    if (response.data?.sucesso) {
      setAtualizarLista(!atualizarLista);
      alert(response.data.mensagem);
    }
  }

  async function excluirEmpresa(cnpj) {
    const response = await axios.delete(
      `http://localhost:3333/excluirEmpresa/${cnpj}`
    );

    if (response.data?.sucesso) {
      setAtualizarLista(!atualizarLista);
      alert(response.data.mensagem);
    }
  }

  return (
    <>
      <div>
        <h1>Cadastro de empresa</h1>
        <form action="post">
          <p>Nome da empresa</p>
          <input type="text" name="nome" id="nome" />
          <p>CNPJ</p>
          <input type="text" name="cnpj" id="cnpj" />
          <p>Data de cadastro</p>
          <input type="date" name="data" id="data" />
          <br />
          <br />
          <button type="button" onClick={cadastrarEmpresa}>
            Cadastrar
          </button>
        </form>
      </div>
      <div>
        <h3>Lista de Empresas</h3>
        {lista.length > 0 ? (
          <p>Não tem empresas Cadastradas</p>
        ) : (
          lista.map((empresa, index) => {
            return (
              <div key={index}>
                <p>Nome: {empresa.nome}</p>
                <p>CNPJ: {empresa.cnpj}</p>
                <p>Data de cadastro: {empresa.data}</p>
                <button onClick={() => excluirEmpresa(empresa.cnpj)}>
                  Excluir
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
