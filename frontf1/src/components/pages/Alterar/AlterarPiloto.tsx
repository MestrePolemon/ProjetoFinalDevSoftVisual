import React, { useState, useEffect } from "react";
import { Piloto } from "../../../models/Piloto";
import './EstiloAlterarP.css';

function AlterarPiloto() {
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [pilotoSelecionado, setPilotoSelecionado] = useState<number>(0);
    const [nome, setNome] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/pilotos/listar')
            .then(response => response.json())
            .then(data => setPilotos(data))
            .catch(error => console.error(error));
    }, []);

    const alterarPiloto = (e: React.FormEvent) => {
        e.preventDefault();

        const pilotoAtualizado = {
            nome,
            nacionalidade,
        };

        fetch(`http://localhost:5256/F1/pilotos/alterar/${pilotoSelecionado}`, {
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
                    <label>Piloto:</label>
                    <select
                        value={pilotoSelecionado}
                        required
                        onChange={e => {
                            const id = Number(e.target.value);
                            setPilotoSelecionado(id);
                            const piloto = pilotos.find(p => p.id === id);
                            if (piloto) {
                                setNome(piloto.nome);
                                setNacionalidade(piloto.nacionalidade);
                            }
                        }}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {pilotos.map(piloto => (
                            <option key={piloto.id} value={piloto.id}>
                                {piloto.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
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
                <button type="submit">Alterar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default AlterarPiloto;
