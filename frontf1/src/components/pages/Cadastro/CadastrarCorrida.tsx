import React, { useEffect, useState } from "react";
import { Corrida } from "../../../models/Corrida";
import { Pista } from "../../../models/Pista";
import { Piloto } from "../../../models/Piloto";

function CadastrarCorrida() {
    const [NomeEvento, setNomeEvento] = useState("");
    const [Voltas, setVoltas] = useState(0);
    const [DataEvento, setDataEvento] = useState("");
    const [PistaId, setPistaId] = useState(0);
    const [Pistas, setPistas] = useState<Pista[]>([]);
    const [VencedorId, setVencedorId] = useState(0);
    const [Pilotos, setPilotos] = useState<Piloto[]>([]);
    const [SegundoId, setSegundoId] = useState(0);
    const [TerceiroId, setTerceiroId] = useState(0);
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5256/F1/pistas/listar')
            .then(response => response.json())
            .then(data => setPistas(data))
            .catch(error => console.error("Erro ao carregar pistas:", error));

        fetch('http://localhost:5256/F1/pilotos/listar')
            .then(response => response.json())
            .then(data => setPilotos(data))
            .catch(error => console.error("Erro ao carregar pilotos:", error));
    }, []);

    function enviarCorrida(e: React.FormEvent) {
        e.preventDefault();

        if (!NomeEvento || Voltas === 0 || PistaId === 0 || VencedorId === 0 || SegundoId === 0 || TerceiroId === 0) {
            setMensagem("Por favor, preencha todos os campos corretamente.");
            return;
        }

        setLoading(true);
        const corrida = { NomeEvento, Voltas, DataEvento, PistaId, VencedorId, SegundoId, TerceiroId };

        fetch('http://localhost:5256/F1/corridas/cadastrar', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corrida)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao cadastrar corrida.");
                return response.json();
            })
            .then(() => setMensagem("Corrida cadastrada com sucesso!"))
            .catch(error => setMensagem(error.message))
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <h1>Cadastrar Corridas</h1>
            <form onSubmit={enviarCorrida}>
                <div>
                    <label>Nome do Evento:</label>
                    <input
                        type="text"
                        value={NomeEvento}
                        required
                        onChange={e => setNomeEvento(e.target.value)}
                    />
                </div>
                <div>
                    <label>Voltas:</label>
                    <input
                        type="number"
                        value={Voltas}
                        required
                        onChange={e => setVoltas(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label>Data do Evento:</label>
                    <input
                        type="date"
                        value={DataEvento}
                        required
                        onChange={e => setDataEvento(e.target.value)}
                    />
                </div>
                <div>
                    <label>Pista:</label>
                    <select
                        value={PistaId}
                        required
                        onChange={e => setPistaId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione uma pista</option>
                        {Pistas.map((pista) => (
                            <option key={pista.id} value={pista.id}>{pista.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Vencedor:</label>
                    <select
                        value={VencedorId}
                        required
                        onChange={e => setVencedorId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {Pilotos.map((piloto) => (
                            <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Segundo:</label>
                    <select
                        value={SegundoId}
                        required
                        onChange={e => setSegundoId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {Pilotos.map((piloto) => (
                            <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Terceiro:</label>
                    <select
                        value={TerceiroId}
                        required
                        onChange={e => setTerceiroId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um piloto</option>
                        {Pilotos.map((piloto) => (
                            <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default CadastrarCorrida;