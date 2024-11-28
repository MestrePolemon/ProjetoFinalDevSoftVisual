import React, { useEffect, useState } from "react";
import { Equipe } from "../../../models/Equipe";

function ListarEquipe() {
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/equipes/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar equipes');
                }
                return response.json();
            })
            .then(data => setEquipes(data))
            .catch(error => setErro(error.message));
    }, []);

    return (
        <div>
            <h1>Lista de Equipes</h1>
            {erro && <p>{erro}</p>}
            <table border={1}>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>País</th>
                    <th>Data de Fundação</th>
                </tr>
                </thead>
                <tbody>
                {equipes.map((equipe, index) => (
                    <tr key={index}>
                        <td>{equipe.nome}</td>
                        <td>{equipe.paisOrigem}</td>
                        <td>{new Date(equipe.dataFundacao).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarEquipe;