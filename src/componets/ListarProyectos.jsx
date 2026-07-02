import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../config/apiConfig";

function ListaProyectos() {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        const obtenerProyectos = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // AQUÍ INYECTAS EL TOKEN
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setProyectos(data);
            } else if (response.status === 403) {
                alert("Acceso denegado: No tienes permisos de ADMIN");
            }
        };

        obtenerProyectos();
    }, []);

    return (
        <table>
            <thead><tr><th>ID</th><th>Nombre</th></tr></thead>
            <tbody>
                {proyectos.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.nombre}</td></tr>)}
            </tbody>
        </table>
    );
}