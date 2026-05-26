import axios from "axios";

const API_URL = "http://13.206.120.195:8080/api/auth";

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/signin`, credentials);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
