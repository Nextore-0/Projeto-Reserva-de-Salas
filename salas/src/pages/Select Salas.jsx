import React, { useState } from "react";
import "./ReservaForm.css";

export default function ReservaForm() {
  const [sala, setSala] = useState("");
  const [data, setData] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sala || !data || !inicio || !fim) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (fim <= inicio) {
      setMensagem("O horário final deve ser depois do horário inicial.");
      return;
    }

    setMensagem(`Reserva confirmada para ${sala} no dia ${data} das ${inicio} às ${fim}.`);
  };

  return (
    <div>
      <header className="header">
        <h1>Sistema de Reserva de Salas</h1>
      </header>

      <div className="container">
        <h2>Reservar Sala</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="sala">Sala:</label>
          <select id="sala" value={sala} onChange={(e) => setSala(e.target.value)} required>
            <option value="">Selecione uma sala</option>
            <option value="Sala 101">Sala 101</option>
            <option value="Sala 102">Sala 102</option>
            <option value="Laboratório">Laboratório</option>
            <option value="Sala de Reuniões">Sala de Reuniões</option>
          </select>

          <label htmlFor="data">Data da Reserva:</label>
          <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} required />

          <label htmlFor="inicio">Horário de Início:</label>
          <input type="time" id="inicio" value={inicio} onChange={(e) => setInicio(e.target.value)} required />

          <label htmlFor="fim">Horário de Término:</label>
          <input type="time" id="fim" value={fim} onChange={(e) => setFim(e.target.value)} required />

          <button type="submit">Confirmar Reserva</button>
        </form>

        {mensagem && <div className="msg">{mensagem}</div>}
      </div>

      <footer className="footer">
        <p>Sistema de Reservas - 2025</p>
      </footer>
    </div>
  );
}
