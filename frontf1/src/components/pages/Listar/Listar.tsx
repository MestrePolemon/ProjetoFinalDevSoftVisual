import React from "react";
import { Link } from "react-router-dom";

function Listagem() {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Listagens</h1>
            <div className="menu-grid">
                <Link to="/listar/piloto" className="menu-item">
                    <h2>Listar Pilotos</h2>
                </Link>
                <Link to="/listar/equipe" className="menu-item">
                    <h2>Listar Equipes</h2>
                </Link>
                <Link to="/listar/corrida" className="menu-item">
                    <h2>Listar Corridas</h2>
                </Link>
            </div>
        </div>
    );
}

export default Listagem;
