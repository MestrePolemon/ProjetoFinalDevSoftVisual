import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Equipe } from "../../../models/Equipe";

function AlterarEquipe() {
    const { nome } = useParams<{ nome: string }>();
    const [nomeEquipe, setNomeEquipe] = useState(nome || "");
    const [paisOrigem, setPaisOrigem] = useState("");
    const [dataFundacao, setDataFundacao] = useState("");
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5256/F1/equipes/buscar/${nome}`)
            .then(response => response.json())
            .then(data => {
                setNomeEquipe(data.nome);
                setPaisOrigem(data.paisOrigem);
                setDataFundacao(data.dataFundacao);
            })
            .catch(error => console.error(error));
    }, [nome]);

    const alterarEquipe = (e: React.FormEvent) => {
        e.preventDefault();

        const equipeAtualizada = {
            nome: nomeEquipe,
            paisOrigem,
            dataFundacao,
        };

        fetch(`http://localhost:5256/F1/equipes/alterar/${nome}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(equipeAtualizada)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao alterar equipe");
                return response.json();
            })
            .then(() => setMensagem("Equipe alterada com sucesso!"))
            .catch(error => setMensagem(error.message));
    };

    return (
        <div>
            <h1>Alterar Equipe</h1>
            <form onSubmit={alterarEquipe}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nomeEquipe}
                        onChange={e => setNomeEquipe(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>País de Origem:</label>
                    <input
                        type="text"
                        value={paisOrigem}
                        onChange={e => setPaisOrigem(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data de Fundação:</label>
                    <input
                        type="date"
                        value={dataFundacao}
                        onChange={e => setDataFundacao(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Alterar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default AlterarEquipe;