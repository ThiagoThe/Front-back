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

    const nomeFantasia = event.target.nomeFantasia.value;
    const cnpj = event.target.cnpj.value;
    const dataDeCriacao = new Date();

    const response = await axios.post("http://localhost:3333/criarEmpresa", {
      nomeFantasia,
      cnpj,
      dataDeCriacao,
    });

    setAtualizarLista(!atualizarLista);
    alert(response.data.mensagem);
  }

  async function excluirEmpresa(cnpj) {
    const response = await axios.delete(
      `http://localhost:3333/excluirEmpresa/${cnpj}`
    );

    setAtualizarLista(!atualizarLista);
    alert(response.data.mensagem);
  }

  return (
    <>
      <div>
        <h1>Cadastro de empresa</h1>
        <form onSubmit={cadastrarEmpresa}>
          <p>Nome da empresa</p>
          <input type="text" name="nomeFantasia" id="nomeFantasia" />
          <p>CNPJ</p>
          <input type="text" name="cnpj" id="cnpj" />

          <br />
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <div>
        <h3>Lista de Empresas</h3>
        {!lista.length > 0 ? (
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
