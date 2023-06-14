import { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";

export const EmpresaContext = createContext();

export const useEmpresa = () => {
  const context = useContext(EmpresaContext);
  return context;
};

export const EmpresaProvider = ({ children }) => {
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
    <EmpresaContext.Provider
      value={{ lista, cadastrarEmpresa, excluirEmpresa }}
    >
      {children}
    </EmpresaContext.Provider>
  );
};
