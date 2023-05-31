import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const carregar = async () => {
      const response = await axios.get("http://localhost:3333/listarEmpresa");
      console.log(response.data);
    };
    carregar();
  }, []);

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
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}

export default App;
