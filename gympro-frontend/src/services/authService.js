import api from "./api";

const signup = async (userData) => {
  const response = await api.post("/api/auth/signup", userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post("/api/auth/signin", { email, password });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
