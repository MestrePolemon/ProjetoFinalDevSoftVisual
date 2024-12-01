import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Torneio } from "../../../models/Torneio";

function DeletarTorneio() {
    const { ano } = useParams<{ ano: string }>();
    const [torneio, setTorneio] = useState<Torneio | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5256/F1/torneios/buscar/${ano}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar torneio");
                }
                return response.json();
            })
            .then(data => setTorneio(data))
            .catch(error => setMensagem(error.message));
    }, [ano]);

    const deletarTorneio = () => {
        fetch(`http://localhost:5256/F1/torneios/deletar/${ano}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao deletar torneio");
                }
                setMensagem("Torneio deletado com sucesso!");
                navigate("/listar/torneio");
            })
            .catch(error => setMensagem(error.message));
    };

    if (!torneio) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Deletar Torneio</h1>
            <p>Tem certeza que deseja deletar o torneio abaixo?</p>
            <div>
                <p><strong>Ano:</strong> {torneio.ano}</p>
                <p><strong>Número de Corridas:</strong> {torneio.numCorridas}</p>
                <p><strong>Vencedor:</strong> {torneio.vencedor?.nome}</p>
                <p><strong>Equipe Vencedora:</strong> {torneio.equipeVencedora?.nome}</p>
            </div>
            <div className="button-container">
                <button onClick={deletarTorneio}>Sim</button>
                <button onClick={() => navigate(-1)}>Não</button>
            </div>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default DeletarTorneio; 