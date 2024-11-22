import { defineStore } from "pinia";
import axios from "axios";
import baseURL from "../Services/baseURL";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || "",
    userId: localStorage.getItem("userId") || "",
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    roles: localStorage.getItem("roles") || [],
    status: "",
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await baseURL.post("/api/auth/signin", credentials);
        this.accessToken = response.data.accessToken;
        this.userId = response.data.id;
        this.username = response.data.username;
        this.email = response.data.email;
        this.roles = response.data.roles;
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("userId", this.userId);
        localStorage.setItem("username", this.username);
        localStorage.setItem("email", this.email);
        localStorage.setItem("userId", this.userId);
        localStorage.setItem("roles", this.roles);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.accessToken}`;
        this.status = "success";
      } catch (error) {
        this.status = "error";
        throw error;
      }
    },

    logout() {
      this.accessToken = "";
      this.userId = null;
      this.username = null;
      this.email = null;
      this.roles = [];
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("roles");
      delete axios.defaults.headers.common["Authorization"];
      this.status = "";
    },
  },
});
