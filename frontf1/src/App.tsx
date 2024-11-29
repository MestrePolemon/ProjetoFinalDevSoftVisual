// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home"; 
import CadastrarPiloto from "./components/pages/piloto/cadastrarPiloto";
import ListarPiloto from "./components/pages/piloto/listarPiloto";
import CadastrarEquipe from "./components/pages/equipe/CadastrarEquipe";
import ListarEquipe from "./components/pages/equipe/listarEquipe";
import "./App.css"; 
function App() {
    return (
        <div id="app">
            <Router>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/pages/piloto/cadastrar">Cadastrar Piloto</a></li>
                        <li><a href="/pages/piloto/listar">Listar Pilotos</a></li>
                        <li><a href="/pages/equipe/cadastrar">Cadastrar Equipe</a></li>
                        <li><a href="/pages/equipe/listar">Listar Equipes</a></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />  {/* Aqui usamos o componente Home */}
                    <Route path="/pages/piloto/cadastrar" element={<CadastrarPiloto />} />
                    <Route path="/pages/piloto/listar" element={<ListarPiloto />} />
                    <Route path="/pages/equipe/cadastrar" element={<CadastrarEquipe />} />
                    <Route path="/pages/equipe/listar" element={<ListarEquipe />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
