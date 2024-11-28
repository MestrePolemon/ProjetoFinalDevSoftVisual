import React from "react";
// @ts-ignore
import {BrowserRouter, Router, Routes, Link, Route} from "react-router-dom";
import CadastrarPiloto from "./components/pages/piloto/cadastrarPiloto";
import ListarPiloto from "./components/pages/piloto/listarPiloto";
import CadastrarEquipe from "./components/pages/equipe/CadastrarEquipe";
import ListarEquipe from "./components/pages/equipe/listarEquipe";
function App() {
  return (
      <div id="app">
          <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/pages/piloto/cadastrar">Cadastrar Piloto</Link>
                    </li>
                    <li>
                        <Link to="/pages/piloto/listar">Listar Pilotos</Link>
                    </li>
                    <li>
                        <Link to="/pages/equipe/cadastrar">Cadastrar Equipe</Link>
                    </li>
                    <li>
                        <Link to="/pages/equipe/listar">Listar Equipes</Link>
                    </li>
                </ul>
            </nav>
              <Routes>
                  <Route path="/pages/piloto/cadastrar" element={<CadastrarPiloto/>}/>
                  <Route path="/pages/piloto/listar" element={<ListarPiloto/>}/>
                  <Route path="/pages/equipe/cadastrar" element={<CadastrarEquipe/>}/>
                  <Route path="/pages/equipe/listar" element={<ListarEquipe/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
