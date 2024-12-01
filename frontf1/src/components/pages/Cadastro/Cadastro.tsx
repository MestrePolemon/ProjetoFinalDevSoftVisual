import React from "react";
import { Link } from "react-router-dom";

function Cadastro() {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Cadastros</h1>
            <div className="menu-grid">
                <Link to="/cadastro/piloto" className="menu-item">
                    <h2>Cadastrar Piloto</h2>
                </Link>
                <Link to="/cadastro/equipe" className="menu-item">
                    <h2>Cadastrar Equipe</h2>
                </Link>
            </div>
        </div>
    );
}

export default Cadastro;
