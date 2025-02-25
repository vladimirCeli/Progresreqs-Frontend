import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('authData');
        return storedAuth ? JSON.parse(storedAuth) : {};
    });
    
    useEffect(() => {
        if (Object.keys(auth).length > 0) {
            localStorage.setItem('authData', JSON.stringify(auth));
        } else {
            localStorage.removeItem('authData');
        }
    }, [auth]);

    const updateAuth = (newAuthData) => {
        setAuth(newAuthData);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;