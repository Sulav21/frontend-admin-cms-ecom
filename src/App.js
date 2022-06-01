import React from 'react'
import './App.css';
import { Registration } from './pages/register-login/Registration';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App=()=>  {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
