import React from "react";
import { Link } from "react-router-dom";

function Cadastro() {
    return (
        <div>
            <h1>Cadastros</h1>
            <Link to="/cadastro/piloto">Cadastrar Piloto</Link>
            <Link to="/cadastro/equipe">Cadastrar Equipe</Link>
            <Link to="/cadastro/corrida">Cadastrar Corrida</Link>
        </div>
    );
}

export default Cadastro;
