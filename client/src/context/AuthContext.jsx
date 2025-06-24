import React,{createContext, useContext, useEffect, useState} from 'react';{}

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);
  
    const login = (newToken) =>{
        localStorage.setItem('token',newToken);
        setToken(newToken);
    };

    const logout = () =>{
        localStorage.removeItem('token');
        setToken(null);
    }
    return (
    <AuthContext.Provider value={{token, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = ()=> useContext(AuthContext);
export default AuthProvider