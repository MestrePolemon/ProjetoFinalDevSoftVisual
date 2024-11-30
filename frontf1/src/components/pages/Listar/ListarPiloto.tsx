import React, { useEffect, useState } from 'react';
import { Piloto } from "../../../models/Piloto";

function ListarPiloto() {
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/pilotos/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar pilotos');
                }
                return response.json();
            })
            .then(data => setPilotos(data))
            .catch(error => setErro(error.message));
    }, []);

    return (
        <div>
            <h1>Lista de Pilotos</h1>
            {erro && <p>{erro}</p>}
            <table border={1}>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Nacionalidade</th>
                    <th>Equipe</th>
                </tr>
                </thead>
                <tbody>
                {pilotos.map((piloto, index) => (
                    <tr key={index}>
                        <td>{piloto.nome}</td>
                        <td>{piloto.nacionalidade}</td>
                        <td>{piloto.equipe?.nome}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarPiloto;