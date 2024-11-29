import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
    const [pilotos, setPilotos] = useState([]);
    const [pilotoSelecionado, setPilotoSelecionado] = useState(null);
    const [corridas, setCorridas] = useState([]);
    const [posicoes, setPosicoes] = useState([]);
    const [corridaAtual, setCorridaAtual] = useState(0);

    // Carregar pilotos e corridas ao carregar a página
    useEffect(() => {
        // Carregar pilotos
        fetch('http://localhost:5256/F1/pilotos/listar')
            .then(response => response.json())
            .then(data => setPilotos(data))
            .catch(error => console.error(error));

        // Carregar corridas
        fetch('http://localhost:5256/F1/corridas/listar')
            .then(response => response.json())
            .then(data => setCorridas(data))
            .catch(error => console.error(error));
    }, []);

    // Função para sortear a posição do piloto na corrida
    function sortearPosicao() {
        if (corridaAtual < corridas.length) {
            const posicao = Math.floor(Math.random() * 20) + 1; // Sorteia entre 1 e 20
            setPosicoes(prevPosicoes => [...prevPosicoes, { corrida: corridas[corridaAtual].nome, posicao }]);
            setCorridaAtual(prevCorrida => prevCorrida + 1);
        }
    }

    return (
        <div>
            <h1>Simulação de Corridas</h1>

            {/* Seleção do Piloto */}
            <div>
                <h3>Escolha seu piloto:</h3>
                <select onChange={e => setPilotoSelecionado(e.target.value)} value={pilotoSelecionado}>
                    <option value={null}>Selecione um piloto</option>
                    {pilotos.map(piloto => (
                        <option key={piloto.id} value={piloto.id}>{piloto.nome}</option>
                    ))}
                </select>
            </div>

            {pilotoSelecionado && corridas.length > 0 && corridaAtual < corridas.length ? (
                <div>
                    <h3>{corridas[corridaAtual].nome}</h3>
                    <button onClick={sortearPosicao}>Correr</button>
                </div>
            ) : null}

            {/* Mostrar as posições ao final das corridas */}
            {corridaAtual >= corridas.length && posicoes.length > 0 && (
                <div>
                    <h3>Resultado das Corridas</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Nome da Corrida</th>
                            <th>Posição</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posicoes.map((item, index) => (
                            <tr key={index}>
                                <td>{item.corrida}</td>
                                <td>{item.posicao}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Home;
