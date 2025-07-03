import { useState } from "react";
import styles from "./NovaSala.module.css";

export default function NovaSala() {
  const [formData, setFormData] = useState({
    numeroSala: "",
    capacidade: "",
    projetor: "",
    arCondicionado: "",
    dias: [],
    horarioDe: "",
    horarioAte: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const novosDias = checked
          ? [...prev.dias, value]
          : prev.dias.filter((dia) => dia !== value);
        return { ...prev, dias: novosDias };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className={styles.novasala}>
      <header className={styles.titulo}>
        <h1>Sistema Reserva de Salas</h1>
      </header>

      <div className={styles.formulario}>
        <div className={styles.cabecalho}>
          <h3>Cadastrar Nova Sala</h3>
        </div>

        <div className={styles.campos}>
          <label>
            Número da sala:
            <input
              type="number"
              name="numeroSala"
              placeholder="Número da sala"
              value={formData.numeroSala}
              onChange={handleChange}
            />
          </label>

          <label>
            Capacidade:
            <input
              type="number"
              name="capacidade"
              placeholder="Capacidade"
              value={formData.capacidade}
              onChange={handleChange}
            />
          </label>

          <label>
            Projetor:
            <select
              name="projetor"
              value={formData.projetor}
              onChange={handleChange}
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </label>

          <label>
            Ar Condicionado:
            <select
              name="arCondicionado"
              value={formData.arCondicionado}
              onChange={handleChange}
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </label>

          <p>Dias Disponíveis:</p>
          <div className={styles.checkboxContainer}>
            {["segunda", "terça", "quarta", "quinta", "sexta"].map((dia) => (
              <label key={dia}>
                <input
                  type="checkbox"
                  name="dias"
                  value={dia}
                  checked={formData.dias.includes(dia)}
                  onChange={handleChange}
                />{" "}
                {dia.slice(0, 3).charAt(0).toUpperCase() + dia.slice(1, 3)}
              </label>
            ))}
          </div>

          <div className={styles.horario}>
            <p>Horários Disponíveis:</p>
            <label>
              De:
              <input
                type="text"
                name="horarioDe"
                value={formData.horarioDe}
                onChange={handleChange}
              />
            </label>
            <label>
              Até:
              <input
                type="text"
                name="horarioAte"
                value={formData.horarioAte}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className={styles.button}>
          <button type="submit">Cadastrar Sala</button>
        </div>
      </div>

      <footer className={styles.rodape}>
        <p>Sistema Reserva de Salas - 2025</p>
      </footer>
    </div>
  );
}
