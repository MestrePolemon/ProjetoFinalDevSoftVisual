import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Torneio } from "../../../models/Torneio";

function ListarTorneio() {
    const [torneios, setTorneios] = useState<Torneio[]>([]);
    const [nomeBusca, setNomeBusca] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5256/F1/torneios/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar torneios');
                }
                return response.json();
            })
            .then(data => setTorneios(data))
            .catch(error => setErro(error.message));
    }, []);

    const torneiosFiltrados = torneios.filter(torneio =>
        torneio.ano.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    return (
        <div>
            <h1>Lista de Torneios</h1>
            {erro && <p>{erro}</p>}
            <table>
                <thead>
                <tr>
                    <th>Ano</th>
                    <th>Número de Corridas</th>
                    <th>Vencedor</th>
                    <th>Equipe Vencedora</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {torneiosFiltrados.map((torneio, index) => (
                    <tr key={index}>
                        <td>{torneio.ano}</td>
                        <td>{torneio.numCorridas}</td>
                        <td>{torneio.vencedor?.nome}</td>
                        <td>{torneio.equipeVencedora?.nome}</td>
                        <td>
                            <button onClick={() => navigate(`/alterar/torneio/${torneio.ano}`)}>
                                Alterar
                            </button>
                            <button onClick={() => navigate(`/deletar/torneio/${torneio.ano}`)}>
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Buscar Torneio</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label>Ano:</label>
                    <input
                        type="text"
                        value={nomeBusca}
                        onChange={e => setNomeBusca(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}

export default ListarTorneio;