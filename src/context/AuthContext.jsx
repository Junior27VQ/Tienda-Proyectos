import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Inicializamos el estado leyendo del localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [rol, setRol] = useState(localStorage.getItem("rol") || null);

    // Login actualizado: recibe token Y rol
    const login = (nuevoToken, nuevoRol) => {
        localStorage.setItem("token", nuevoToken);
        localStorage.setItem("rol", nuevoRol);
        setToken(nuevoToken);
        setRol(nuevoRol);
    };

    // Logout: Limpia TODO
    const logout = () => {
        localStorage.clear(); // Limpia token, rol, username, etc.
        setToken(null);
        setRol(null);
    };

    // ... registrar ...

    return (
        <AuthContext.Provider value={{ token, rol, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}