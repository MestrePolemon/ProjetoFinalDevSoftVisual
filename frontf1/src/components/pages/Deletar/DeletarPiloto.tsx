import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Piloto } from "../../../models/Piloto";
{/*import './EstiloDeletarP.css';*/}

function DeletarPiloto() {
    const { nome } = useParams<{ nome: string }>();
    const [piloto, setPiloto] = useState<Piloto | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5256/F1/pilotos/buscar/${nome}`)
            .then(response => response.json())
            .then(data => setPiloto(data))
            .catch(error => console.error(error));
    }, [nome]);

    const deletarPiloto = () => {
        fetch(`http://localhost:5256/F1/pilotos/deletar/${nome}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao deletar piloto");
                return response.json();
            })
            .then(() => {
                setMensagem("Piloto deletado com sucesso!");
                navigate("/listar/piloto");
            })
            .catch(error => setMensagem(error.message));
    };

    if (!piloto) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Deletar Piloto</h1>
            <p>Tem certeza que deseja deletar o piloto abaixo?</p>
            <div>
                <p><strong>Nome:</strong> {piloto.nome}</p>
                <p><strong>Nacionalidade:</strong> {piloto.nacionalidade}</p>
                <p><strong>Equipe:</strong> {piloto.equipe?.nome}</p>
            </div>
            <button onClick={deletarPiloto}>Sim</button>
            <button onClick={() => navigate(-1)}>Não</button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default DeletarPiloto;