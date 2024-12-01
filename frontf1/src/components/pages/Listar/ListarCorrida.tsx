import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Corrida } from "../../../models/Corrida";

function ListarCorrida() {
    const [corridas, setCorridas] = useState<Corrida[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [nomeBusca, setNomeBusca] = useState("");
    const navigate = useNavigate();

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

    const corridasFiltradas = corridas.filter(corrida =>
        corrida.nomeEvento.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    const deletarCorrida = (nome: string) => {
        fetch(`http://localhost:5256/F1/corridas/deletar/${nome}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao deletar corrida");
                setCorridas(corridas.filter(corrida => corrida.nomeEvento !== nome));
            })
            .catch(error => setErro(error.message));
    };

    return (
        <div>
            <h1>Lista de Corridas</h1>
            {erro && <p>{erro}</p>}
            <table>
                <thead>
                <tr>
                    <th>Nome do Evento</th>
                    <th>Voltas</th>
                    <th>Data do Evento</th>
                    <th>Pista</th>
                    <th>Vencedor</th>
                    <th>Segundo</th>
                    <th>Terceiro</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {corridasFiltradas.map((corrida, index) => (
                    <tr key={index}>
                        <td>{corrida.nomeEvento}</td>
                        <td>{corrida.voltas}</td>
                        <td>{new Date(corrida.dataEvento).toLocaleDateString()}</td>
                        <td>{corrida.pista.nome}</td>
                        <td>{corrida.vencedor.nome}</td>
                        <td>{corrida.segundo.nome}</td>
                        <td>{corrida.terceiro.nome}</td>
                        <td>
                            <button onClick={() => navigate(`/alterar/corrida/${corrida.nomeEvento}`)}>
                                Alterar
                            </button>
                            <button className="button-delete" onClick={() => deletarCorrida(corrida.nomeEvento)}>
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Buscar Corrida</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label>Nome do Evento:</label>
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

export default ListarCorrida;