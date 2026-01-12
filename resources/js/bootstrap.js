import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = '/api';

// Optional: Add a request interceptor to handle errors globally
window.axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized, please login.');
        }
        return Promise.reject(error);
    }
);
