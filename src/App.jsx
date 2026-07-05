import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './componets/Navbar';
import PanelProyectos from './pages/PanelProyectos';
import FormularioProyecto from './pages/FormularioProyecto';
import ProtectedRoute from './componets/ProtecteRoute';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
                
        <Navbar />

          <main className="container">
          <Routes>
                       
            <Route path="/" element={<Login />} />
            <Route element={ <ProtectedRoute/> }>
              <Route path="/proyectos" element={ <PanelProyectos /> } />

              <Route path="/crear-tarea" element={<FormularioProyecto />} />

            </Route>
            <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
