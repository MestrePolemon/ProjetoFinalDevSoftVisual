import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Corrida } from "../../../models/Corrida";

function DeletarCorrida() {
    const { nome } = useParams<{ nome: string }>();
    const [corrida, setCorrida] = useState<Corrida | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5256/F1/corridas/buscar/${nome}`)
            .then(response => response.json())
            .then(data => setCorrida(data))
            .catch(error => console.error(error));
    }, [nome]);

    const deletarCorrida = () => {
        fetch(`http://localhost:5256/F1/corridas/deletar/${nome}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao deletar corrida");
                setMensagem("Corrida deletada com sucesso!");
                navigate("/listar/corrida");
            })
            .catch(error => setMensagem(error.message));
    };

    if (!corrida) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Deletar Corrida</h1>
            <p>Tem certeza que deseja deletar a corrida abaixo?</p>
            <div>
                <p><strong>Nome do Evento:</strong> {corrida.nomeEvento}</p>
                <p><strong>Voltas:</strong> {corrida.voltas}</p>
                <p><strong>Data do Evento:</strong> {new Date(corrida.dataEvento).toLocaleDateString()}</p>
                <p><strong>Pista:</strong> {corrida.pista.nome}</p>
                <p><strong>Vencedor:</strong> {corrida.vencedor.nome}</p>
                <p><strong>Segundo:</strong> {corrida.segundo.nome}</p>
                <p><strong>Terceiro:</strong> {corrida.terceiro.nome}</p>
            </div>
            <button onClick={deletarCorrida}>Sim</button>
            <button onClick={() => navigate(-1)}>Não</button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default DeletarCorrida;