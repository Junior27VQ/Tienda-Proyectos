import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../config/apiConfig";

function PanelProyectos() {
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProyectos = async () => {
            const token = localStorage.getItem('token');
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
                    method: 'GET',
                    headers: {
                        // AQUÍ ESTÁ LA CLAVE DEL EXAMEN:
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 403) {
                    setError("Acceso denegado: No tienes permisos para ver esto.");
                } else if (response.ok) {
                    const data = await response.json();
                    setProyectos(data);
                }
            } catch (err) {
                setError("Error de conexión con el servidor.");
            }
        };

        cargarProyectos();
    }, []);

    return (
        <div className="panel-container">
            <h2>Panel de Proyectos</h2>
            {error && <div className="alert-error">{error}</div>}
            
            <table className="tabla-proyectos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Fecha Límite</th>
                    </tr>
                </thead>
                <tbody>
                    {proyectos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.descripcion}</td>
                            <td>{p.fechaLimite}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PanelProyectos;