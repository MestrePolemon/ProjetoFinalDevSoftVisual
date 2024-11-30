import React from "react";
import { Link } from "react-router-dom";

function Buscar() {
    return (
        <div>
            <h1>Buscas</h1>
            <Link to="/buscar/piloto">Buscar Piloto</Link>
            <Link to="/buscar/equipe">Buscar Equipe</Link>
            <Link to="/buscar/corrida">Buscar Corrida</Link>
        </div>
    );
}

export default Buscar;
