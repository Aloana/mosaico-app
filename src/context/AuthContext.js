import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    const login = (email) => {
        const role = email.trim().toLowerCase();
        if (role === 'responsáveis') setUserRole('parent');
        else if (role === 'professor') setUserRole('teacher');
        else if (role === 'gestor') setUserRole('manager');
        else alert('Perfil inválido.');
    };

    const logout = () => {
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};