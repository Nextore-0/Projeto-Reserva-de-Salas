// src/pages/SalasCadastradas.jsx

import React from 'react';
import styles from './SalasCadastradas.module.css';

export default function SalasCadastradas() {
    return (
        // ERRO 1 CORRIGIDO: Removida a tag <body>
        <div className={styles.container}>
            <h2>Salas Cadastradas</h2>

            <div className={styles.sala}>
                <span>Sala 001</span>
                <div className={styles.actions}>
                    <button>Editar</button>
                    {/* ERRO 2 CORRIGIDO: Trocado 'class' por 'className' e usando o objeto styles */}
                    <button className={styles.excluir}>Excluir</button>
                </div>
            </div>

            <div className={styles.sala}>
                <span>Sala 002</span>
                <div className={styles.actions}>
                    <button>Editar</button>
                    <button className={styles.excluir}>Excluir</button>
                </div>
            </div>

            <div className={styles.sala}>
                <span>Sala 003</span>
                <div className={styles.actions}>
                    <button>Editar</button>
                    <button className={styles.excluir}>Excluir</button>
                </div>
            </div>

            {/* ERRO 3 CORRIGIDO: 'add-btn' virou 'addBtn' */}
            <div className={styles.addBtn}>
                <button>+ Adicionar nova sala</button>
            </div>
        </div>
    );
}