import React from 'react'
import './App.css';
import { RegistrationPage } from './pages/register-login/RegistrationPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './pages/register-login/LoginPage';
import { EmailVerification } from './pages/register-login/EmailVerification';

const App=()=>  {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegistrationPage/>} />
        <Route path='/admin/verify-email' element={<EmailVerification/>} />
        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
