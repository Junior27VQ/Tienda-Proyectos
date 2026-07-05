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
            <h2 className="panel-title">Panel de Proyectos</h2>
            
            {error && <div className="error-alert">{error}</div>}
            
            <div className="proyectos-grid">
                {proyectos.map((p) => (
                    <div key={p.id} className="proyecto-card">
                        <h3>Proyecto #{p.id}</h3>
                        <p><strong>Descripción:</strong> {p.descripcion}</p>
                        <div className="card-footer">
                            <span>📅 {p.fechaInicio}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PanelProyectos;