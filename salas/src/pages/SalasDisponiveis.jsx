import React from "react";
import styles from "./SalasDisponiveis.module.css";

export default function SalasDisponiveis() {
  return (
    <div className={styles.salas}>
      <nav id={styles.menuHorizontal}>
        <ul>
          <li>
            <a href="./Salas Disponiveis.jsx">Salas Disponíveis</a>
          </li>
          <li>
            <a href="./ReservarSala.jsx">Minhas Reservas</a>
          </li>
        </ul>
      </nav>

      <div className={styles.salas}>
        {/*  mapear as salas disponíveis */}
        {/* Exemplo: salas.map(sala => <SalaCard key={sala.id} {...sala} />) */}
      </div>
    </div>
  );
}
