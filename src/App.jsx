import "./App.css";
import { Outlet } from "react-router-dom";
import { EmpresaProvider } from "./contexts/empresaContext";
import { UsuarioProvider } from "./contexts/userContext";

function App() {
  return (
    <div>
      <UsuarioProvider>
        <EmpresaProvider>
          <Outlet />
        </EmpresaProvider>
      </UsuarioProvider>
    </div>
  );
}

export default App;
