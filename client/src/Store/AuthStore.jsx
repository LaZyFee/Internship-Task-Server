import { create } from "zustand";
import axios from "axios";
import CheckAdmin from "../Store/CheckAdmin";
const API_URL = "https://internship-task-server.up.railway.app";

axios.defaults.withCredentials = true;

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
  isLoading: false,
  isAdmin: false,
  isAdminLoading: true,

  // Method to set admin status
  setIsAdmin: (isAdmin) => set({ isAdmin }),

  // Signup function
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      const { user, token } = response.data;

      // Save both user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Check admin status right after signup
      const [isAdmin] = await CheckAdmin();
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isAdmin, // Update admin status here
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // Login function
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { user, token } = response.data;

      // Save both user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Check admin status right after login
      const [isAdmin] = await CheckAdmin();
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isAdmin, // Update admin status here
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem("user");
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isAdminLoading: false,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // Sync across tabs
  syncUserAcrossTabs: () => {
    window.addEventListener("storage", async (event) => {
      if (event.key === "user") {
        const user = JSON.parse(event.newValue);
        const isAuthenticated = !!user;
        if (user) {
          const [isAdmin] = await CheckAdmin();
          set({ user, isAuthenticated, isAdmin });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
          });
        }
      }
    });
  },

  // Check admin status on app load
  checkAdminOnLoad: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const [isAdmin] = await CheckAdmin();
      set({
        user,
        isAuthenticated: true,
        isAdmin,
        isAdminLoading: false,
      });
    } else {
      set({ isAdminLoading: false });
    }
  },
}));

// Initialize the sync across tabs functionality
useAuth.getState().syncUserAcrossTabs();
useAuth.getState().checkAdminOnLoad();
