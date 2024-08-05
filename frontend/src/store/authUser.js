import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });

    try {
      const response = await axios.post("/netview/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/netview/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false});
      toast.success("Logged In Successfully");
    } catch (error) {
      console.log("Error in log in frontend");
      toast.error(error.response.data.message);
      set({ user: null, isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axios.post("/netview/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error in logout frontend");
      toast.error(error.response.data.message);
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/netview/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
