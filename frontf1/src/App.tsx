import React from "react";
// @ts-ignore
import {BrowserRouter, Router, Routes, Link, Route} from "react-router-dom";
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
                        <Link to="">Cadastrar Produto</Link>
                    </li>
                    <li>
                        <Link to="">Listar Produtos</Link>
                    </li>
                </ul>
            </nav>
              <Routes>
                  <Route path="" element={</>} />
                  <Route path="" element={</>} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
