import { useUsuario } from "../contexts/userContext";

function Usuarios() {
  const context = useUsuario();

  const { userLista, cadastrarUsuario, excluirUsuario } = context;

  return (
    <>
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
        {!userLista.length > 0 ? (
          <p>Não há usuários cadastrados</p>
        ) : (
          userLista.map((usuario, index) => {
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
