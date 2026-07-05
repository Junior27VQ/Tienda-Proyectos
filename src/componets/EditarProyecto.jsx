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
        <div className="form-container">
            <form className="project-form" onSubmit={handleUpdate}>
                <h2>Editar Proyecto</h2>
                
                <div className="form-group">
                    <label>Nombre del Proyecto</label>
                    <input 
                        type="text" value={proyecto.nombre} required
                        onChange={e => setProyecto({...proyecto, nombre: e.target.value})} 
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <textarea 
                        value={proyecto.descripcion} required
                        onChange={e => setProyecto({...proyecto, descripcion: e.target.value})} 
                    />
                </div>

                <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <input 
                        type="date" value={proyecto.fechaInicio} required
                        onChange={e => setProyecto({...proyecto, fechaInicio: e.target.value})} 
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-submit">Guardar Cambios</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate('/gestionar-proyectos')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default EditarProyecto;