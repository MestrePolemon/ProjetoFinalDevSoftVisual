import React, { useState, useEffect } from "react";
import './EstiloCadastroP.css';

function CadastrarPiloto() {
    const [nome, setNome] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [equipeId, setEquipeId] = useState(0);
    const [mensagem, setMensagem] = useState("");
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5256/F1/equipes/listar')
            .then(response => response.json())
            .then(data => setEquipes(data))
            .catch(error => console.error(error));
    }, []);

    function enviarPiloto(e: any) {
        e.preventDefault();
        const piloto = {
            nome: nome,
            nacionalidade: nacionalidade,
            equipeId: equipeId
        };
        fetch('http://localhost:5256/F1/pilotos/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(piloto)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMensagem("Piloto cadastrado com sucesso!");
            })
            .catch(error => {
                console.error(error);
                setMensagem("Erro ao cadastrar piloto.");
            });
    }

    return (
        <div>
            <h1>Cadastrar Piloto</h1>
            <form onSubmit={enviarPiloto}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} required onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Nacionalidade:</label>
                    <input type="text" value={nacionalidade} required onChange={e => setNacionalidade(e.target.value)} />
                </div>
                <div>
                    <label>Equipe:</label>
                    <select value={equipeId} required onChange={e => setEquipeId(Number(e.target.value))}>
                        <option value={0}>Selecione uma equipe</option>
                        {equipes.map((equipe: any) => (
                            <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default CadastrarPiloto;