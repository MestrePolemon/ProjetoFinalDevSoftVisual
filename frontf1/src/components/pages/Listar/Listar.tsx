import React from "react";
import { Link } from "react-router-dom";

function Listagem() {
    return (
        <div>
            <h1>Listagens</h1>
            <Link to="/listar/piloto">Listar Pilotos</Link>
            <Link to="/listar/equipe">Listar Equipes</Link>
            <Link to="/listar/corrida">Listar Corridas</Link>
        </div>
    );
}

export default Listagem;
