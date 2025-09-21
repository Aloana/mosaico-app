import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provedor do Contexto
export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    // Função de login que será usada pela LoginScreen
    const login = (email) => {
        const role = email.trim().toLowerCase();
        if (role === 'responsáveis') setUserRole('parent');
        else if (role === 'professor') setUserRole('teacher');
        else if (role === 'gestor') setUserRole('manager');
        else alert('Perfil inválido.');
    };

    // Função de logout que será usada pela tela de Perfil/Menu
    const logout = () => {
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Cria um "hook" customizado para facilitar o uso do contexto
export const useAuth = () => {
    return useContext(AuthContext);
};