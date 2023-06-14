import "./App.css";
import { Outlet } from "react-router-dom";
import { EmpresaProvider } from "./contexts/empresaContext";

function App() {
  return (
    <div>
      <EmpresaProvider>
        <Outlet />
      </EmpresaProvider>
    </div>
  );
}

export default App;
