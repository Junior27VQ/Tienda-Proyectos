import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { rol, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        
        logout();
        
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">Gestión Proyectos</div>
            <ul>
               
                <li><Link to="/proyectos">Ver Proyectos</Link></li>

            
                {rol === 'ADMIN' && (
                    <>
                        <li><Link to="/gestionar-proyectos">Gestionar Proyectos</Link></li>
                        <li><Link to="/crear-tarea">Crear Tareas</Link></li>
                    </>
                )}

               
                <li>
                    <button onClick={handleLogout} className="btn-logout">
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;