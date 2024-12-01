import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Equipe } from "../../../models/Equipe";

function ListarEquipe() {
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const navigate = useNavigate();

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

    const equipesFiltradas = equipes.filter(equipe =>
        equipe.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    const deletarEquipe = (nome: string) => {
        fetch(`http://localhost:5256/F1/equipes/deletar/${nome}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao deletar equipe");
                setEquipes(equipes.filter(equipe => equipe.nome !== nome));
            })
            .catch(error => setErro(error.message));
    };

    return (
        <div>
            <h1>Lista de Equipes</h1>
            {erro && <p>{erro}</p>}
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>País</th>
                    <th>Data de Fundação</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {equipesFiltradas.map((equipe, index) => (
                    <tr key={index}>
                        <td>{equipe.nome}</td>
                        <td>{equipe.paisOrigem}</td>
                        <td>{new Date(equipe.dataFundacao).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => navigate(`/alterar/equipe/${equipe.nome}`)}>
                                Alterar
                            </button>
                            <button className="button-delete" onClick={() => deletarEquipe(equipe.nome)}>
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Buscar Equipe</h2>
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

export default ListarEquipe;