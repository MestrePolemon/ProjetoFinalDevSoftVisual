import React from "react";
import { Link } from "react-router-dom";

function Buscar() {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Buscas</h1>
            <div className="menu-grid">
                <Link to="/buscar/piloto" className="menu-item">
                    <h2>Buscar Piloto</h2>
                </Link>
                <Link to="/buscar/equipe" className="menu-item">
                    <h2>Buscar Equipe</h2>
                </Link>
                <Link to="/buscar/corrida" className="menu-item">
                    <h2>Buscar Corrida</h2>
                </Link>
            </div>
        </div>
    );
}

export default Buscar;
