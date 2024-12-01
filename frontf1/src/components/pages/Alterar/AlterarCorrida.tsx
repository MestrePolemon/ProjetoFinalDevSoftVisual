import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pista } from "../../../models/Pista";
import { Piloto } from "../../../models/Piloto";

function AlterarCorrida() {
    const { nome } = useParams<{ nome: string }>();
    const [nomeEvento, setNomeEvento] = useState(nome || "");
    const [voltas, setVoltas] = useState(0);
    const [dataEvento, setDataEvento] = useState("");
    const [pistaId, setPistaId] = useState(0);
    const [pistas, setPistas] = useState<Pista[]>([]);
    const [vencedorId, setVencedorId] = useState(0);
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [segundoId, setSegundoId] = useState(0);
    const [terceiroId, setTerceiroId] = useState(0);
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5256/F1/pistas/listar')
            .then(response => response.json())
            .then(data => setPistas(data))
            .catch(error => console.error("Erro ao carregar pistas:", error));

        fetch('http://localhost:5256/F1/pilotos/listar')
            .then(response => response.json())
            .then(data => setPilotos(data))
            .catch(error => console.error("Erro ao carregar pilotos:", error));

        fetch(`http://localhost:5256/F1/corridas/buscar/${nome}`)
            .then(response => response.json())
            .then(data => {
                setNomeEvento(data.nomeEvento);
                setVoltas(data.voltas);
                setDataEvento(data.dataEvento);
                setPistaId(data.pistaId);
                setVencedorId(data.vencedorId);
                setSegundoId(data.segundoId);
                setTerceiroId(data.terceiroId);
            })
            .catch(error => console.error(error));
    }, [nome]);

    const alterarCorrida = (e: React.FormEvent) => {
        e.preventDefault();

        const corridaAtualizada = {
            nomeEvento,
            voltas,
            dataEvento,
            pistaId,
            vencedorId,
            segundoId,
            terceiroId,
        };

        fetch(`http://localhost:5256/F1/corridas/alterar/${nome}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corridaAtualizada)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao alterar corrida");
                return response.json();
            })
            .then(() => setMensagem("Corrida alterada com sucesso!"))
            .catch(error => setMensagem(error.message));
    };

    return (
        <div>
            <h1>Alterar Corrida</h1>
            <form onSubmit={alterarCorrida}>
                <div>
                    <label>Nome do Evento:</label>
                    <input
                        type="text"
                        value={nomeEvento}
                        onChange={e => setNomeEvento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Voltas:</label>
                    <input
                        type="number"
                        value={voltas}
                        onChange={e => setVoltas(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Data do Evento:</label>
                    <input
                        type="date"
                        value={dataEvento}
                        onChange={e => setDataEvento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Pista:</label>
                    <select
                        value={pistaId}
                        required
                        onChange={e => setPistaId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione uma pista</option>
                        {pistas.map(pista => (
                            <option key={pista.id} value={pista.id}>{pista.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Vencedor:</label>
                    <select
                        value={vencedorId}
                        required
                        onChange={e => setVencedorId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {pilotos.map(piloto => (
                            <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Segundo:</label>
                    <select
                        value={segundoId}
                        required
                        onChange={e => setSegundoId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {pilotos.map(piloto => (
                            <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Terceiro:</label>
                    <select
                        value={terceiroId}
                        required
                        onChange={e => setTerceiroId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {pilotos.map(piloto => (
                            <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Alterar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default AlterarCorrida;