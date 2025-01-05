import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref({
    name: ''
  });
  const error = ref(null);

  const login = async (username, password) => {
    error.value = null;
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/", {
        username,
        password,
      });
      if (response.data.access) {
        token.value = {
          access: response.data.access,
          refresh: response.data.refresh,
        };
        user.value.name = username;
        saveTokenToLocalStorage(token.value);
      }
    } catch (err) {
      error.value = err.response?.data?.detail || "Login failed. Please try again.";
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    error.value = null;
    removeTokenFromLocalStorage();
  };

  function saveTokenToLocalStorage(tokens) {
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
  }
  

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("authToken");
  };

  const loadTokenFromLocalStorage = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      token.value = storedToken;
    }
  };

  // Load token on app startup
  loadTokenFromLocalStorage();

  return { token, user, error, login, logout };
});
