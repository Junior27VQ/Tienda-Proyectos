import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function FormularioProyectos() {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        fechaInicio: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData) // Esto envía exactamente el formato que definiste
        });

        if (response.ok) {
            alert("Proyecto creado correctamente");
        } else if (response.status === 403) {
            alert("Error: No tienes permisos para esta acción (403)");
        }
    };

    return (
        <div className="form-container">
            <form className="project-form" onSubmit={handleSubmit}>
                <h2>Crear Nuevo Proyecto</h2>
                
                <div className="form-group">
                    <label>Nombre del Proyecto</label>
                    <input 
                        type="text" placeholder="Ej. Gestión de Inventarios" required
                        onChange={e => setFormData({...formData, nombre: e.target.value})} 
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <textarea 
                        placeholder="Describe el proyecto..." required
                        onChange={e => setFormData({...formData, descripcion: e.target.value})} 
                    />
                </div>

                <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <input 
                        type="date" required
                        onChange={e => setFormData({...formData, fechaInicio: e.target.value})} 
                    />
                </div>

                <button type="submit" className="btn-submit">Crear Proyecto</button>
            </form>
        </div>
    );
}

export default FormularioProyectos;