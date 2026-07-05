import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";
import { useNavigate } from "react-router-dom";

function GestionarProyectos() {
    const { token } = useAuth();
    const [proyectos, setProyectos] = useState([]);
    const navigate = useNavigate();

    // Cargar proyectos al iniciar
    useEffect(() => {
        cargarProyectos();
    }, [token]);

    const cargarProyectos = async () => {
        const res = await fetch(`${API_BASE_URL}/api/proyectos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setProyectos(data);
    };

    const eliminarProyecto = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;
        
        const res = await fetch(`${API_BASE_URL}/api/proyectos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            cargarProyectos(); // Refrescar lista
        } else if (res.status === 403) {
            alert("No tienes permiso para eliminar proyectos.");
        }
    };

    return (
        <div className="gestion-container">
            <h2 className="titulo-gestion">Gestión de Proyectos</h2>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.map(p => (
                            <tr key={p.id}>
                                <td data-label="Nombre">{p.nombre}</td>
                                <td data-label="Fecha">{p.fechaInicio}</td>
                                <td className="acciones">
                                    <button className="btn-edit" onClick={() => navigate(`/editar-proyecto/${p.id}`)}>Editar</button>
                                    <button className="btn-delete" onClick={() => eliminarProyecto(p.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default GestionarProyectos;