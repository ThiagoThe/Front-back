import { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";

export const UsuarioContext = createContext();

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  return context;
};

export const UsuarioProvider = ({ children }) => {
  const [userLista, userSetLista] = useState([]);
  const [atualizarListaUser, setAtualizarListaUser] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const response = await axios.get("http://localhost:3333/listarUsuario");
      userSetLista(response.data?.dados || []);
    };
    carregar();
  }, [atualizarListaUser]);

  console.log(userLista);

  async function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = event.target.nome.value;
    const idade = event.target.idade.value;
    const email = event.target.email.value;

    const response = await axios.post("http://localhost:3333/criarUsuario", {
      nome,
      idade,
      email,
    });

    setAtualizarListaUser(!atualizarListaUser);
    alert(response.data.mensagem);
  }

  async function excluirUsuario(id) {
    const response = await axios.delete(
      `http://localhost:3333/excluirUsuario/${id}`
    );

    setAtualizarListaUser(!atualizarListaUser);
    alert(response.data.mensagem);
  }

  return (
    <UsuarioContext.Provider
      value={{ userLista, cadastrarUsuario, excluirUsuario }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
