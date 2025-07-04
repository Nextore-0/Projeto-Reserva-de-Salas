import "./App.css";
import LoginForm from "./pages/LoginForm";
import { Routes, Route } from "react-router-dom";
import SalasDisponiveis from "./pages/LoginForm";
import Cadastro from "./pages/Cadastro";
import SalasCadastradas from "./pages/SalasCadastradas";
import SelectSala from "./pages/Select Salas";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/SalasDisponiveis" element={<SalasDisponiveis />}></Route>
        <Route path="/Cadastro" element={<Cadastro />}></Route>
        <Route path="/SalasCadastradas" element={<SalasCadastradas />}></Route>
        <Route path="/SelectSala" element={<SelectSala />}></Route>
      </Routes>
    </div>
  );
}

export default App;
