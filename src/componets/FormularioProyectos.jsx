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
        <form onSubmit={handleSubmit}>
            <input 
                type="text" placeholder="Nombre" 
                onChange={e => setFormData({...formData, nombre: e.target.value})} 
            />
            <input 
                type="text" placeholder="Descripción" 
                onChange={e => setFormData({...formData, descripcion: e.target.value})} 
            />
            <input 
                type="date" 
                onChange={e => setFormData({...formData, fechaInicio: e.target.value})} 
            />
            <button type="submit">Crear Proyecto</button>
        </form>
    );
}

export default FormularioProyectos;