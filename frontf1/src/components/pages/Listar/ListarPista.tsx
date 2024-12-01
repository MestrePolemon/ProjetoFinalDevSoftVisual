import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pista } from "../../../models/Pista";

function ListarPista() {
    const [pistas, setPistas] = useState<Pista[]>([]);
    const [nomeBusca, setNomeBusca] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5256/F1/pistas/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar pistas');
                }
                return response.json();
            })
            .then(data => setPistas(data))
            .catch(error => setErro(error.message));
    }, []);

    const pistasFiltradas = pistas.filter(pista =>
        pista.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    return (
        <div>
            <h1>Lista de Pistas</h1>
            {erro && <p>{erro}</p>}
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>País</th>
                    <th>Comprimento</th>
                    <th>Data da Fundação</th>
                </tr>
                </thead>
                <tbody>
                {pistasFiltradas.map((pista, index) => (
                    <tr key={index}>
                        <td>{pista.nome}</td>
                        <td>{pista.pais}</td>
                        <td>{pista.distancia} km</td>
                        <td>{new Date(pista.dataFundacao).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Buscar Pista</h2>
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

export default ListarPista;