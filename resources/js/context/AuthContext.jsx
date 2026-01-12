import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const response = await axios.get('/user');
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            // First get CSRF cookie
            await axios.get('/sanctum/csrf-cookie', { baseURL: '/' });
            const response = await axios.post('/login', credentials, { baseURL: '/' });
            await checkUser();
            toast.success('تم تسجيل الدخول بنجاح');
            return response;
        } catch (err) {
            toast.error(err.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout', {}, { baseURL: '/' });
            setUser(null);
            toast.info('تم تسجيل الخروج');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
