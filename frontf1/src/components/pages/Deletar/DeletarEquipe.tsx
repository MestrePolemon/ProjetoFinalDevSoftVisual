import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Equipe } from "../../../models/Equipe";

function DeletarEquipe() {
    const { nome } = useParams<{ nome: string }>();
    const [equipe, setEquipe] = useState<Equipe | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5256/F1/equipes/buscar/${nome}`)
            .then(response => response.json())
            .then(data => setEquipe(data))
            .catch(error => console.error(error));
    }, [nome]);

    const deletarEquipe = () => {
        fetch(`http://localhost:5256/F1/equipes/deletar/${nome}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao deletar equipe");
                setMensagem("Equipe deletada com sucesso!");
                navigate("/listar/equipe");
            })
            .catch(error => setMensagem(error.message));
    };

    if (!equipe) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Deletar Equipe</h1>
            <p>Tem certeza que deseja deletar a equipe abaixo?</p>
            <div>
                <p><strong>Nome:</strong> {equipe.nome}</p>
                <p><strong>País:</strong> {equipe.paisOrigem}</p>
                <p><strong>Data de Fundação:</strong> {new Date(equipe.dataFundacao).toLocaleDateString()}</p>
            </div>
            <button onClick={deletarEquipe}>Sim</button>
            <button onClick={() => navigate(-1)}>Não</button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default DeletarEquipe;