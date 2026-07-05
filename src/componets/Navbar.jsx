import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function Navbar() {
    const { rol, token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (err) {
            console.error('Error al revocar token:', err);
        }
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">Gestión Proyectos</div>
            <ul>
                {rol === 'USER' && (
                <li><Link to="/proyectos">Ver Proyectos</Link></li>
                )}
                {rol === 'ADMIN' && (
                    <>
                        <li><Link to="/gestionar-proyectos">Gestionar</Link></li>
                        <li><Link to="/crear-tarea">Crear Tarea</Link></li>
                    </>
                )}
                {rol === 'USER' && (
                <li>
                    <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;