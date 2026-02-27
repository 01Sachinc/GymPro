import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (name, email, password, phone) => {
    return axios.post(API_URL + 'signup', {
        name,
        email,
        password,
        phone,
    });
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'signin', {
        email,
        password,
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
