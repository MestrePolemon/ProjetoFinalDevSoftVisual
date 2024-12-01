import React from "react";
import { Link } from "react-router-dom";

function Alteracao() {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Alterações</h1>
            <div className="menu-grid">
                <Link to="/alterar/piloto" className="menu-item">
                    <h2>Alterar Piloto</h2>
                </Link>
                <Link to="/alterar/equipe" className="menu-item">
                    <h2>Alterar Equipe</h2>
                </Link>
            </div>
        </div>
    );
}

export default Alteracao;
