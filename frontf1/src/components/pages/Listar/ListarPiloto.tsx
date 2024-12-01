import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Piloto } from "../../../models/Piloto";
import { Equipe } from "../../../models/Equipe";


function ListarPiloto() {
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const navigate = useNavigate();

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

        fetch('http://localhost:5256/F1/equipes/listar')
            .then(response => response.json())
            .then(data => setEquipes(data))
            .catch(error => console.error(error));
    }, []);

    const pilotosFiltrados = pilotos.filter(piloto =>
        piloto.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    return (
        <div>
            <h1>Lista de Pilotos</h1>
            {erro && <p>{erro}</p>}
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Nacionalidade</th>
                    <th>Equipe</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {pilotosFiltrados.map((piloto, index) => (
                    <tr key={index}>
                        <td>{piloto.nome}</td>
                        <td>{piloto.nacionalidade}</td>
                        <td>{piloto.equipe?.nome}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/alterar/piloto/${piloto.nome}`)}
                            >
                                Alterar
                            </button>
                            <button
                                onClick={() => navigate(`/deletar/piloto/${piloto.nome}`)}
                            >
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Buscar Piloto</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label>Nome:</label>
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

export default ListarPiloto;