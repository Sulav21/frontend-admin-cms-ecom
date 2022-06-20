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
import { Dashboard } from './pages/dashboard/Dashboard';
import { AdminProfile } from './pages/admin-profile/AdminProfile';
import { Categories } from './pages/categories/Categories';
import { Product } from './pages/product/Product';

const App=()=>  {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* Private route */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/admin-profile' element={<AdminProfile/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/products' element={<Product/>}/>
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
