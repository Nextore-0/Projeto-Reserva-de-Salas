import { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Enviado!");
    return navigate("/SalasDisponiveis");
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.mainCabeçalho}>
        <h1>Sistema Reserva de Salas</h1>
      </header>

      <div className={styles.box}>
        <h3>Realize o Login</h3>

        <div className={styles.campoTextual}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.campoTextual}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.button}>
          <button onClick={handleLogin}>ENTRAR</button>
        </div>

        <div className={styles.button}>
          <Link to="/Cadastro">
            <button>Cadastrar-se</button>
          </Link>
        </div>
      </div>

      <footer className={styles.mainFooter}>
        <p>Sistema Reserva de Salas - 2025</p>
      </footer>
    </div>
  );
}
