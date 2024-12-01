import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Cadastro from "./components/pages/Cadastro/Cadastro";
import Listagem from "./components/pages/Listar/Listar";
import Alteracao from "./components/pages/Alterar/Alterar";

import Delecao from "./components/pages/Deletar/Deletar";
import ListarPiloto from "./components/pages/Listar/ListarPiloto";
import ListarEquipe from "./components/pages/Listar/ListarEquipe";
import ListarCorrida from "./components/pages/Listar/ListarCorrida";
import "./App.css";
import CadastrarPiloto from "./components/pages/Cadastro/CadastrarPiloto";
import CadastrarEquipe from "./components/pages/Cadastro/CadastrarEquipe";
import CadastrarCorrida from "./components/pages/Cadastro/CadastrarCorrida";
import AlterarPiloto from "./components/pages/Alterar/AlterarPiloto";
import AlterarEquipe from "./components/pages/Alterar/AlterarEquipe";
import AlterarCorrida from "./components/pages/Alterar/AlterarCorrida";
import DeletarPiloto from "./components/pages/Deletar/DeletarPiloto";
import DeletarCorrida from "./components/pages/Deletar/DeletarCorrida";
import DeletarEquipe from "./components/pages/Deletar/DeletarEquipe";
import ListarPista from "./components/pages/Listar/ListarPista";
import ListarTorneio from "./components/pages/Listar/ListarTorneio";


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
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/listagem" element={<Listagem />} />
                    

                    {/* Rotas de Cadastro */}
                    <Route path="/cadastro/piloto" element={<CadastrarPiloto />} />
                    <Route path="/cadastro/equipe" element={<CadastrarEquipe />} />
                    <Route path="/cadastro/corrida" element={<CadastrarCorrida />} />

                    {/* Rotas de Listagem */}
                    <Route path="/listar/piloto" element={<ListarPiloto />} />
                    <Route path="/listar/equipe" element={<ListarEquipe />} />
                    <Route path="/listar/corrida" element={<ListarCorrida />} />
                    <Route path="/listar/pista" element={<ListarPista />} />
                    <Route path="/listar/torneio" element={<ListarTorneio />} />

                    {/* Rotas de Alteração */}
                    <Route path="/alterar/piloto/:nome" element={<AlterarPiloto />} />
                    <Route path="/alterar/equipe/:nome" element={<AlterarEquipe />} />
                    <Route path="/alterar/corrida/:nome" element={<AlterarCorrida />} />

                    {/* Rotas de Deleção */}
                    <Route path="/deletar/piloto/:nome" element={<DeletarPiloto />} />
                    <Route path="/deletar/equipe/:nome" element={<DeletarEquipe />} />
                    <Route path="/deletar/corrida/:nome" element={<DeletarCorrida />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;