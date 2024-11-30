import React from "react";
import { Link } from "react-router-dom";

function Alteracao() {
    return (
        <div>
            <h1>Alterações</h1>
            <Link to="/alterar/piloto">Alterar Piloto</Link>
            <Link to="/alterar/equipe">Alterar Equipe</Link>
            <Link to="/alterar/corrida">Alterar Corrida</Link>
        </div>
    );
}

export default Alteracao;
