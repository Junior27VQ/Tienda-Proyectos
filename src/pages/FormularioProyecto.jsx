import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function FormularioProyecto() {
    const { rol } = useAuth(); // Obtenemos el rol del contexto
    const [formData, setFormData] = useState({
        descripcion: "",
        fechaLimite: "",
        costoEstimado: "",
        prioridad: "BAJA" // Valor por defecto
    });
    const [mensaje, setMensaje] = useState("");

    // Si no es ADMIN, bloqueamos el acceso desde el frontend
    if (rol !== "ADMIN") {
        return <p className="error-msg">Acceso denegado: Solo administradores pueden crear proyectos.</p>;
    }

    const manejarCambio = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setMensaje("Proyecto registrado con éxito");
        } else if (response.status === 400) {
            const errData = await response.json(); // Esperamos {"error": "Prioridad no válida"}
            setMensaje("Error: " + errData.error);
        } else {
            setMensaje("Error al registrar el proyecto");
        }
    };

    return (
        <form onSubmit={manejarSubmit} className="form-card">
            <h2>Registrar Nuevo Proyecto</h2>
            <input name="descripcion" placeholder="Descripción" onChange={manejarCambio} required />
            <input name="fechaLimite" type="date" onChange={manejarCambio} required />
            <input name="costoEstimado" type="number" placeholder="Costo" onChange={manejarCambio} required />
            
            <select name="prioridad" onChange={manejarCambio}>
                <option value="BAJA">BAJA</option>
                <option value="MEDIA">MEDIA</option>
                <option value="ALTA">ALTA</option>
            </select>

            <button type="submit">Guardar Proyecto</button>
            {mensaje && <p>{mensaje}</p>}
        </form>
    );
}

export default FormularioProyecto;