import "./App.css";
import LoginForm from "./pages/LoginForm";
import { Routes, Route } from "react-router-dom"; 
import SalasDisponiveis from "./pages/LoginForm";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/SalasDisponiveis" element={<SalasDisponiveis />}></Route>
        <Route path="/Cadastro" element={<Cadastro />}></Route>
      </Routes>
    </div>
  );
}

export default App;
