import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const getUser = async () => {
    // Note: Authorization header is handled via interceptor or manual addition
    // Since we don't have an interceptor setup in this file, we rely on the component adding it
    // OR we should set defaults. 
    // Given the current setup in TodoList showing interceptors might be in index.js or App.js?
    // Let's check where the token is added. 
    // Ah, wait. The user's previous code used `authApi` which didn't have interceptors shown here.
    // The `getTodos` in `todoApi` likely has it.
    // Let's assume we need to pass the header here or use a configured instance.
    // For now, let's grab token from localStorage directly here to be safe and quick.
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/user`, config);
    return response.data;
};

export const updateProfile = async (userData) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/update`, userData, config);
    return response.data;
};
