import React, { useState } from 'react';

function CadastrarEquipe() {
    const [nome, setNome] = useState('');
    const [paisOrigem, setPaisOrigem] = useState('');
    const [dataFundacao, setDataFundacao] = useState('');
    const [mensagem, setMensagem] = useState('');

    function enviarEquipe(e: any) {
        e.preventDefault();
        const equipe = {
            nome: nome,
            paisOrigem: paisOrigem,
            dataFundacao: dataFundacao
        };
        fetch('http://localhost:5256/F1/equipes/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(equipe)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMensagem("Equipe cadastrada com sucesso!");
            })
            .catch(error => {
                console.error(error);
                setMensagem("Erro ao cadastrar equipe.");
            });
    }

    return (
        <div>
            <h1>Cadastrar Equipe</h1>
            <form onSubmit={enviarEquipe}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} required onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <label>País de Origem:</label>
                    <input type="text" value={paisOrigem} required onChange={e => setPaisOrigem(e.target.value)} />
                </div>
                <div>
                    <label>Data de Fundação:</label>
                    <input type="date" value={dataFundacao} required onChange={e => setDataFundacao(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default CadastrarEquipe;