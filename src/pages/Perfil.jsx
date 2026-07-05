import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Perfil(){
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState('');

    const {token} = useAuth();

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState(null);
    function mostrarAlerta(msg) {
        setAlerta(msg);
    };

    useEffect(()=>{
        const cargarPerfil = async ()=>{
            try{
                const response = await fetch(`${API_BASE_URL}/api/auth/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(!response.ok){
                    throw new Error('No se podo cargar Perfil, inicie sesion nuevamente')
                }
                const data = await response.json();
                setDatosPerfil(data);
            }catch(err){
                setError(err.message)
            };
        }
        cargarPerfil()
    }, [token]);


    return(
        <div className="auth-container">
            <div className="auth-card profile-card">
                <header className="profile-header">
                    <h2>Perfil de Usuario</h2>
                    
                </header>

                {error && <p className="error-msg">{error}</p>}

                {datosPerfil && (
                    <div className="profile-details">
                        <div className="detail-item">
                            <span>Usuario:</span>
                            <p className="highlight">{datosPerfil.Usuario}</p>
                        </div>
                        <div className="detail-item">
                            <span>Rol:</span>
                            <p>{datosPerfil.Rol}</p>
                        </div>
                        <div className="detail-item">
                            <span>Estado:</span>
                            <p>{datosPerfil.Estatus}</p>
                        </div>
                        <p className="welcome-msg">{datosPerfil.Mensaje}</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Perfil;