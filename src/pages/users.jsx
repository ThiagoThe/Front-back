import axios from "axios";
import { useEffect, useState } from "react";

function Usuarios() {
  const [lista, setLista] = useState([]);
  const [atualizarLista, setAtualizarLista] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const response = await axios.get("http://localhost:3333/listarUsuario");
      setLista(response.data?.dados || []);
    };
    carregar();
  }, [atualizarLista]);

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

    setAtualizarLista(!atualizarLista);
    alert(response.data.mensagem);
  }

  async function excluirUsuario(id) {
    const response = await axios.delete(
      `http://localhost:3333/deletarUsuario/${id}`
    );

    setAtualizarLista(!atualizarLista);
    alert(response.data.mensagem);
  }

  return (
    <>
      <nav>
        <ul>
          <a href="#"> Home</a>
        </ul>
        <ul>
          <a href="#">Empresas</a>
        </ul>
        <ul>
          <a href="#">Usuários</a>
        </ul>
      </nav>
      <div>
        <h1>Página de Usuários</h1>
        <form onSubmit={cadastrarUsuario}>
          <p>Nome Completo</p>
          <input type="text" name="nome" id="nome" />
          <p>idade</p>
          <input type="number" name="idade" id="idade" />
          <p>E-mail</p>
          <input type="email" name="email" id="email" />
          <br />
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <div>
        <h3>Lista de Usuários</h3>
        {!lista.length > 0 ? (
          <p>Não há usuários cadastrados</p>
        ) : (
          lista.map((usuario, index) => {
            return (
              <div key={index}>
                <p>Nome: {usuario.nome}</p>
                <p>Idade: {usuario.idade}</p>
                <p>Email: {usuario.email}</p>
                <button onClick={() => excluirUsuario(usuario.id)}>
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

export default Usuarios;
