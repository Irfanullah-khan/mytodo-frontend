// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/todos';

// const api = axios.create({
//     baseURL: API_URL,
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export const getTodos = async () => {
//     const response = await api.get('/');
//     return response.data;
// };

// export const createTodo = async (data) => {
//     // When sending FormData, let the browser set the Content-Type header
//     // so it includes the boundary parameter automatically.
//     const response = await api.post('/', data);
//     return response.data;
// };

// export const updateTodo = async (id, data) => {
//     // Similarly for update
//     const response = await api.put(`/${id}`, data);
//     return response.data;
// };

// export const deleteTodo = async (id) => {
//     const response = await api.delete(`/${id}`);
//     return response.data;
// };

// export default api;







import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/todos`;

const api = axios.create({
  baseURL: API_URL,
});

/* 🔐 JWT INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= TODOS APIs ================= */

export const getTodos = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTodo = async (data) => {
  const response = await api.post('/', data);
  return response.data;
};

export const updateTodo = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;
