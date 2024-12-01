import React, { useState, useEffect } from 'react';
import './home.css';
import { Pista } from '../../../models/Pista';
import { Piloto } from '../../../models/Piloto';

interface VitoriasPiloto {
    pilotoId: number;
    nome: string;
    vitorias: number;
    equipeId?: number;
}

function Home() {
    const [pistas, setPistas] = useState<Pista[]>([]);
    const [pistasUtilizadas, setPistasUtilizadas] = useState<number[]>([]);
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [pistaSelecionada, setPistaSelecionada] = useState<Pista | null>(null);
    const [vitorias, setVitorias] = useState<VitoriasPiloto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mensagem, setMensagem] = useState<string>("");
    const [anoAtual, setAnoAtual] = useState<number>(() => {
        const savedYear = localStorage.getItem('temporadaAno');
        return savedYear ? parseInt(savedYear) : new Date().getFullYear();
    });

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:5256/F1/pistas/listar'),
            fetch('http://localhost:5256/F1/pilotos/listar')
        ])
            .then(([pistasRes, pilotosRes]) => Promise.all([pistasRes.json(), pilotosRes.json()]))
            .then(([pistasData, pilotosData]) => {
                setPistas(pistasData);
                setPilotos(pilotosData);
                const vitoriasIniciais = pilotosData.map((piloto: Piloto) => ({
                    pilotoId: piloto.id,
                    nome: piloto.nome,
                    vitorias: 0,
                    equipeId: piloto.equipeId
                }));
                setVitorias(vitoriasIniciais);
                setLoading(false);
            })
            .catch(error => {
                setError('Erro ao carregar dados');
                setLoading(false);
            });
    }, []);

    const registrarTorneio = async (vencedor: VitoriasPiloto) => {
        const novoTorneio = {
            ano: anoAtual.toString(),
            numCorridas: pistas.length,
            vencedorID: vencedor.pilotoId,
            EquipeVencedoraID: vencedor.equipeId
        };

        try {
            const response = await fetch('http://localhost:5256/F1/torneios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoTorneio)
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar torneio');
            }

            const vitoriasIniciais = pilotos.map(piloto => ({
                pilotoId: piloto.id,
                nome: piloto.nome,
                vitorias: 0,
                equipeId: piloto.equipeId
            }));
            setVitorias(vitoriasIniciais);
            
            const novoAno = anoAtual + 1;
            setAnoAtual(novoAno);
            localStorage.setItem('temporadaAno', novoAno.toString());

            return await response.json();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            console.error('Erro ao registrar torneio:', errorMessage);
            throw new Error(errorMessage);
        }
    };

    const handlePistaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const pistaId = parseInt(event.target.value);
        const pista = pistas.find(p => p.id === pistaId) || null;
        setPistaSelecionada(pista);
        setMensagem("");
    };

    const simularCorrida = () => {
        if (!pistaSelecionada || pilotos.length < 3) {
            setMensagem("Selecione uma pista e certifique-se de que há pelo menos 3 pilotos cadastrados");
            return;
        }

        const pilotosEmbaralhados = [...pilotos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const dataEvento = new Date();
        dataEvento.setFullYear(anoAtual);
        
        const novaCorrida = {
            nomeEvento: `GP ${pistaSelecionada.nome} ${anoAtual}`,
            voltas: Math.floor(Math.random() * 50) + 50,
            dataEvento: dataEvento.toISOString().split('T')[0],
            pistaID: pistaSelecionada.id,
            vencedorID: pilotosEmbaralhados[0].id,
            segundoID: pilotosEmbaralhados[1].id,
            terceiroID: pilotosEmbaralhados[2].id
        };

        fetch('http://localhost:5256/F1/corridas/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaCorrida)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro ao cadastrar corrida: ${text}`);
                    });
                }
                return response.json();
            })
            .then(async () => {
                setVitorias(prev => prev.map(p => 
                    p.pilotoId === pilotosEmbaralhados[0].id 
                        ? { ...p, vitorias: p.vitorias + 1 }
                        : p
                ));

                setPistasUtilizadas(prev => [...prev, pistaSelecionada.id]);
                
                if (pistasUtilizadas.length === pistas.length - 1) {
                    const vencedorTorneio = [...vitorias].sort((a, b) => b.vitorias - a.vitorias)[0];
                    
                    try {
                        await registrarTorneio(vencedorTorneio);
                        setPistasUtilizadas([]);
                        setMensagem(`Corrida finalizada!\n
                            🏆 Resultado Final:\n
                            🥇 1º Lugar: ${pilotosEmbaralhados[0].nome}\n
                            🥈 2º Lugar: ${pilotosEmbaralhados[1].nome}\n
                            🥉 3º Lugar: ${pilotosEmbaralhados[2].nome}\n
                            \n🎉 Temporada concluída!\n
                            🏆 Campeão do Torneio: ${vencedorTorneio.nome}\n
                            Total de vitórias: ${vencedorTorneio.vitorias}`);
                    } catch (error: unknown) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
                        setMensagem('Erro ao registrar torneio: ' + errorMessage);
                    }
                } else {
                    setMensagem(`Corrida finalizada!\n
                        🏆 Resultado Final:\n
                        🥇 1º Lugar: ${pilotosEmbaralhados[0].nome}\n
                        🥈 2º Lugar: ${pilotosEmbaralhados[1].nome}\n
                        🥉 3º Lugar: ${pilotosEmbaralhados[2].nome}`);
                }
                
                setPistaSelecionada(null);
            })
            .catch(error => {
                setMensagem('Erro ao registrar a corrida: ' + error.message);
                console.error('Erro completo:', error);
            });
    };

    const pistasDisponiveis = pistas.filter(pista => !pistasUtilizadas.includes(pista.id));

    const resetarTemporada = () => {
        const anoAtual = new Date().getFullYear();
        setAnoAtual(anoAtual);
        localStorage.setItem('temporadaAno', anoAtual.toString());
        setPistasUtilizadas([]);
        setVitorias(pilotos.map(piloto => ({
            pilotoId: piloto.id,
            nome: piloto.nome,
            vitorias: 0,
            equipeId: piloto.equipeId
        })));
        setMensagem("Temporada resetada para o ano atual.");
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container">
            <h1>Fórmula 1</h1>
            <h3>Temporada {anoAtual}</h3>
            <h3>Selecione uma pista para iniciar a corrida:</h3>
            <select 
                onChange={handlePistaChange} 
                value={pistaSelecionada?.id || ""}
            >
                <option value="">Selecione uma pista</option>
                {pistasDisponiveis.map(pista => (
                    <option key={pista.id} value={pista.id}>
                        {pista.nome}
                    </option>
                ))}
            </select>

            {pistasUtilizadas.length > 0 && (
                <p className="pistas-info">
                    Temporada {anoAtual} - Pistas disponíveis: {pistasDisponiveis.length} de {pistas.length}
                </p>
            )}

            {vitorias.some(p => p.vitorias > 0) && (
                <div className="standings-info">
                    <h4>Classificação atual:</h4>
                    {[...vitorias]
                        .sort((a, b) => b.vitorias - a.vitorias)
                        .filter(p => p.vitorias > 0)
                        .map((piloto, index) => (
                            <p key={piloto.pilotoId}>
                                {index + 1}º {piloto.nome}: {piloto.vitorias} vitória{piloto.vitorias !== 1 ? 's' : ''}
                            </p>
                        ))
                    }
                </div>
            )}

            {pistaSelecionada && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome da Pista</th>
                                <th>País</th>
                                <th>Distância (km)</th>
                                <th>Data de Fundação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{pistaSelecionada.nome}</td>
                                <td>{pistaSelecionada.pais}</td>
                                <td>{pistaSelecionada.distancia}</td>
                                <td>{new Date(pistaSelecionada.dataFundacao).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <button 
                        onClick={simularCorrida}
                        className="race-button"
                        disabled={!pistaSelecionada || pilotos.length < 3}
                    >
                        Iniciar Corrida
                    </button>
                </>
            )}

            {mensagem && (
                <div className={mensagem.includes('Erro') ? 'error-message' : 'success-message'}>
                    {mensagem.split('\n').map((linha, i) => (
                        <p key={i}>{linha.trim()}</p>
                    ))}
                </div>
            )}

            {pistasUtilizadas.length > 0 && (
                <button 
                    className="reset-button"
                    onClick={resetarTemporada}
                >
                    Resetar Temporada
                </button>
            )}
        </div>
    );
}

export default Home;
