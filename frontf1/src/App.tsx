import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Cadastro from "./components/pages/Cadastro/Cadastro";
import Listagem from "./components/pages/Listar/Listar";
import Alteracao from "./components/pages/Alterar/Alterar";
import Busca from "./components/pages/Buscar/Busca";
import Delecao from "./components/pages/Deletar/Deletar";
import ListarPiloto from "./components/pages/Listar/ListarPiloto";
import ListarEquipe from "./components/pages/Listar/ListarEquipe";
import ListarCorrida from "./components/pages/Listar/ListarCorrida";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <nav className="nav-container">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cadastro" className="nav-link">Cadastros</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/listagem" className="nav-link">Listagem</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/alteracao" className="nav-link">Alteração</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/busca" className="nav-link">Busca</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/delecao" className="nav-link">Deleção</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/listagem" element={<Listagem />} />
                    <Route path="/alteracao" element={<Alteracao />} />
                    <Route path="/busca" element={<Busca />} />
                    <Route path="/delecao" element={<Delecao />} />
                    
                    {/* Rotas de Listagem */}
                    <Route path="/listar/piloto" element={<ListarPiloto />} />
                    <Route path="/listar/equipe" element={<ListarEquipe />} />
                    <Route path="/listar/corrida" element={<ListarCorrida />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
