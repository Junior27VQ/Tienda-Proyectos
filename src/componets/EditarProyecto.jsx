import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function EditarProyecto() {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const { token } = useAuth();
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState({ nombre: "", descripcion: "", fechaInicio: "" });

    // 1. Cargar datos actuales
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/proyectos/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setProyecto(data));
    }, [id, token]);

    // 2. Enviar actualización
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/proyectos/${id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(proyecto)
            });

            if (res.ok) {
                alert("Proyecto actualizado");
                navigate('/gestionar-proyectos');
            } else if (res.status === 403) {
                alert("Acceso denegado: Solo administradores.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Editar Proyecto</h2>
            <input value={proyecto.nombre} onChange={e => setProyecto({...proyecto, nombre: e.target.value})} />
            <input value={proyecto.descripcion} onChange={e => setProyecto({...proyecto, descripcion: e.target.value})} />
            <input type="date" value={proyecto.fechaInicio} onChange={e => setProyecto({...proyecto, fechaInicio: e.target.value})} />
            <button type="submit">Guardar Cambios</button>
        </form>
    );
}
export default EditarProyecto;