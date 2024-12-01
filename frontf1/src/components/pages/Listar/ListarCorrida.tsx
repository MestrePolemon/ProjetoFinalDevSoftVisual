import React, { useEffect, useState } from 'react';

interface Piloto {
    id: number;
    nome: string;
}

interface Pista {
    id: number;
    nome: string;
}

interface Corrida {
    id: number;
    nomeEvento: string;
    voltas: number;
    dataEvento: string;
    pista: Pista;
    vencedor: Piloto;
    segundo: Piloto;
    terceiro: Piloto;
}

function ListarCorrida() {
    const [corridas, setCorridas] = useState<Corrida[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/corridas/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar corridas');
                }
                return response.json();
            })
            .then(data => setCorridas(data))
            .catch(error => setErro(error.message));
    }, []);

    return (
        <div>
            <h1>Lista de Corridas</h1>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <table border={1}>
                <thead>
                    <tr>
                        <th>Nome do Evento</th>
                        <th>Pista</th>
                        <th>Voltas</th>
                        <th>Data</th>
                        <th>Vencedor</th>
                        <th>Segundo Lugar</th>
                        <th>Terceiro Lugar</th>
                    </tr>
                </thead>
                <tbody>
                    {corridas.map((corrida) => (
                        <tr key={corrida.id}>
                            <td>{corrida.nomeEvento}</td>
                            <td>{corrida.pista?.nome}</td>
                            <td>{corrida.voltas}</td>
                            <td>{new Date(corrida.dataEvento).toLocaleDateString()}</td>
                            <td>{corrida.vencedor?.nome}</td>
                            <td>{corrida.segundo?.nome}</td>
                            <td>{corrida.terceiro?.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarCorrida;
