import React, { useState, useEffect } from "react";
import { Piloto } from "../../../models/Piloto";
import './EstiloDeletarP.css';

function DeletarPiloto() {
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [pilotoSelecionado, setPilotoSelecionado] = useState<number>(0);
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/pilotos/listar')
            .then(response => response.json())
            .then(data => setPilotos(data))
            .catch(error => console.error(error));
    }, []);

    const deletarPiloto = () => {
        fetch(`http://localhost:5256/F1/pilotos/deletar/${pilotoSelecionado}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao deletar piloto");
                return response.json();
            })
            .then(() => {
                setMensagem("Piloto deletado com sucesso!");
                setPilotos(pilotos.filter(p => p.id !== pilotoSelecionado));
            })
            .catch(error => setMensagem(error.message));
    };

    return (
        <div>
            <h1>Deletar Piloto</h1>
            <div>
                <label>Piloto:</label>
                <select
                    value={pilotoSelecionado}
                    required
                    onChange={e => setPilotoSelecionado(Number(e.target.value))}
                >
                    <option value={0}>Selecione um piloto</option>
                    {pilotos.map(piloto => (
                        <option key={piloto.id} value={piloto.id}>
                            {piloto.nome}
                        </option>
                    ))}
                </select>
                <button onClick={deletarPiloto}>Deletar</button>
            </div>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default DeletarPiloto;
