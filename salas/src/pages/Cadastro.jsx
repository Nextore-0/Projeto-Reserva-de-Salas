import { useState } from "react";
import styles from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleContact = () => {
    console.log("Enviado!");
    return navigate("/");
  };

  const handleSalasCadastradas = () => {
    return navigate("/SalasCadastradas");
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.mainCabeçalho}>
        <h1>Sistema Reserva de Salas</h1>
      </header>
      <div className={styles.box}>
        <h3>Cadastre-se</h3>
        <div className={styles.campoTextual}>
          <input
            type="text"
            placeholder="Nome"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

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
          <button onClick={handleSalasCadastradas} type="submit">Cadastrar</button>
        </div>

        <div className={styles.button}>
          <button onClick={handleContact}>Voltar ao Login</button>
        </div>
      </div>
    </div>
  );
}
