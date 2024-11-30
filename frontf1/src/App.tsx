import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Cadastro from "./components/pages/Cadastro/Cadastro";
import Listagem from "./components/pages/Listar/Listar";
import Alteracao from "./components/pages/Alterar/Alterar";
import Busca from "./components/pages/Buscar/Busca";
import Delecao from "./components/pages/Deletar/Deletar";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div id="app">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/cadastro">Cadastros</Link>
                        </li>
                        <li>
                            <Link to="/listagem">Listagem</Link>
                        </li>
                        <li>
                            <Link to="/alteracao">Alteração</Link>
                        </li>
                        <li>
                            <Link to="/busca">Busca</Link>
                        </li>
                        <li>
                            <Link to="/delecao">Deleção</Link>
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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
