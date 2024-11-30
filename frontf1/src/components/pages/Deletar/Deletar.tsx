import React from "react";
import { Link } from "react-router-dom";

function Delecao() {
    return (
        <div>
            <h1>Deleção</h1>
            <Link to="/deletar/piloto">Deletar Piloto</Link>
            <Link to="/deletar/equipe">Deletar Equipe</Link>
            <Link to="/deletar/corrida">Deletar Corrida</Link>
        </div>
    );
}

export default Delecao;
