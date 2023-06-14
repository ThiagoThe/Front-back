import { useEmpresa } from "../contexts/empresaContext";

function Empresas() {
  const context = useEmpresa();

  const { lista, cadastrarEmpresa, excluirEmpresa } = context;

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
                <p>Nome: {empresa.nomeFantasia}</p>
                <p>CNPJ: {empresa.cnpj}</p>
                <p>Data de cadastro: {empresa.dataDeCriacao}</p>
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

export default Empresas;
