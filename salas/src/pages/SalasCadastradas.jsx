import React, { useState } from 'react';
import styles from './SalasCadastradas.module.css';

export default function SalasCadastradas() {
    return (
<html lang="pt-br">
<body>
  <div className={styles.container}>
    <h2>Salas Cadastradas</h2>
    <div className={styles.sala}><span>Sala 001</span><div class="actions"><button>Editar</button><button class="excluir">Excluir</button></div></div>
    <div className={styles.sala}><span>Sala 002</span><div class="actions"><button>Editar</button><button class="excluir">Excluir</button></div></div>
    <div className={styles.sala}><span>Sala 003</span><div class="actions"><button>Editar</button><button class="excluir">Excluir</button></div></div>

    <div className={styles.add-button}>
      <button>+ Adicionar nova sala</button>
    </div>
  </div>
</body>
</html>
    )
}