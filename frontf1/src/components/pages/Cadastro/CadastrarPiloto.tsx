import React, { useState, useEffect } from "react";
import '../EstiloCadastro/EstiloCadastro.css';
import { Equipe } from "../../../models/Equipe";

function CadastrarPiloto() {
    const [nome, setNome] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [equipeId, setEquipeId] = useState(0);
    const [mensagem, setMensagem] = useState("");
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5256/F1/equipes/listar')
            .then(response => response.json())
            .then(data => setEquipes(data))
            .catch(error => console.error("Erro ao carregar equipes:", error));
    }, []);

    function enviarPiloto(e: React.FormEvent) {
        e.preventDefault();

        if (!nome || !nacionalidade || equipeId === 0) {
            setMensagem("Por favor, preencha todos os campos corretamente.");
            return;
        }

        setLoading(true);
        const piloto = { nome, nacionalidade, equipeId };

        fetch('http://localhost:5256/F1/pilotos/cadastrar', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(piloto)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao cadastrar piloto.");
                return response.json();
            })
            .then(() => setMensagem("Piloto cadastrado com sucesso!"))
            .catch(error => setMensagem(error.message))
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <h1>Cadastrar Piloto</h1>
            <form onSubmit={enviarPiloto}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        required
                        onChange={e => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nacionalidade:</label>
                    <input
                        type="text"
                        value={nacionalidade}
                        required
                        onChange={e => setNacionalidade(e.target.value)}
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
                <button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            {mensagem && (
                <p className={mensagem.includes("sucesso") ? "mensagem-sucesso" : "mensagem-erro"}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}

export default CadastrarPiloto;
