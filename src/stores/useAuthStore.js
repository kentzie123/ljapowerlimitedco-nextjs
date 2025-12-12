import { create } from "zustand";

// Socket Client
import io from "socket.io-client";

// API
import api from "@/utils/axios"; // Ensure this path matches your folder structure

// Toast
import { toast } from "react-toastify";

// Stores
import { useChatStore } from "./useChatStore";

// Generate Client ID
const generateClientId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `Client${randomNum}`;
};

export const useAuthStore = create((set, get) => ({
  clientId: "",
  socket: null,

  connectSocket: () => {
    // ✅ FIX: Use process.env.NEXT_PUBLIC_API_URL
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      query: {
        userId: get().clientId,
      },
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.connected);
      set({ socket });
    });

    // New Messages Listener
    useChatStore.getState().handleNewMessageListener(socket);
  },

  fetchClientLocalData: async () => {
    // Safety check for Server Side Rendering
    if (typeof window === "undefined") return false;

    try {
      const clientId = localStorage.getItem("clientId");

      if (!clientId) return false;
      console.log(`Have CientId: ${clientId}`);

      // Check if local storage client exist in db
      const fetchedUser = await api.get(`/auth/check-user-exist/${clientId}`);
      const fetchedUserData = fetchedUser.data.data;
      console.log(fetchedUserData);

      if (!fetchedUserData) return false;
      console.log(`Found in DB: ${fetchedUserData}`);

      set({ clientId: fetchedUserData.id });

      const { fetchMessages } = useChatStore.getState();
      fetchMessages(fetchedUserData.id);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  createClientAccount: async () => {
    const clientRandomId = generateClientId();
    set({ clientId: clientRandomId });

    try {
      await api.post(`/auth/create`, { clientId: clientRandomId });
      // Safety check
      if (typeof window !== "undefined") {
        localStorage.setItem("clientId", clientRandomId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  },
}));
