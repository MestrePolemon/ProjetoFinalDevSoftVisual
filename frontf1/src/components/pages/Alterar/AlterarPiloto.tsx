import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Equipe } from "../../../models/Equipe";

function AlterarPiloto() {
    const { nome } = useParams<{ nome: string }>();
    const [nomePiloto, setNomePiloto] = useState(nome || "");
    const [nacionalidade, setNacionalidade] = useState("");
    const [equipeId, setEquipeId] = useState(0);
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/equipes/listar')
            .then(response => response.json())
            .then(data => setEquipes(data))
            .catch(error => console.error(error));
    }, []);

    const alterarPiloto = (e: React.FormEvent) => {
        e.preventDefault();

        const pilotoAtualizado = {
            nome: nomePiloto,
            nacionalidade,
            equipeId,
        };

        fetch(`http://localhost:5256/F1/pilotos/alterar/${nome}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pilotoAtualizado)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao alterar piloto");
                return response.json();
            })
            .then(() => setMensagem("Piloto alterado com sucesso!"))
            .catch(error => setMensagem(error.message));
    };

    return (
        <div>
            <h1>Alterar Piloto</h1>
            <form onSubmit={alterarPiloto}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nomePiloto}
                        onChange={e => setNomePiloto(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nacionalidade:</label>
                    <input
                        type="text"
                        value={nacionalidade}
                        onChange={e => setNacionalidade(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Equipe:</label>
                    <select
                        value={equipeId}
                        required
                        onChange={e => setEquipeId(Number(e.target.value))}
                    >
                        <option value={0}>Selecione uma equipe</option>
                        {equipes.map(equipe => (
                            <option key={equipe.id} value={equipe.id}>
                                {equipe.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Alterar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default AlterarPiloto; 