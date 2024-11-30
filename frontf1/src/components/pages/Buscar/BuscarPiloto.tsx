import React, { useState } from "react";
import { Piloto } from "../../../models/Piloto";
import './EstiloBuscarP.css';

function BuscarPiloto() {
    const [id, setId] = useState<number | null>(null);
    const [piloto, setPiloto] = useState<Piloto | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    const buscarPiloto = () => {
        fetch(`http://localhost:5256/F1/pilotos/buscar/${id}`)
            .then(response => {
                if (!response.ok) throw new Error("Piloto não encontrado");
                return response.json();
            })
            .then(data => setPiloto(data))
            .catch(error => {
                setPiloto(null);
                setErro(error.message);
            });
    };

    return (
        <div>
            <h1>Buscar Piloto</h1>
            <div>
                <label>ID do Piloto:</label>
                <input
                    type="number"
                    value={id || ''}
                    onChange={e => setId(Number(e.target.value))}
                />
                <button onClick={buscarPiloto}>Buscar</button>
            </div>
            {erro && <p className="erro">{erro}</p>}
            {piloto && (
                <div>
                    <h2>Detalhes do Piloto</h2>
                    <p>Nome: {piloto.nome}</p>
                    <p>Nacionalidade: {piloto.nacionalidade}</p>
                    <p>Equipe: {piloto.equipe?.nome || "Sem equipe"}</p>
                </div>
            )}
        </div>
    );
}

export default BuscarPiloto;
