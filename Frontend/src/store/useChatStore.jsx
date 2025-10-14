import { create } from "zustand";
import axiosInstance from "../Hooks/customInstance";

const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chat",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) || false,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(newValue));
    set({ isSoundEnabled: newValue });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/chats");
      set({ allContacts: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/${userId}/messages`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData, currentUser) => {
    const { selectedUser, messages } = get();
    const temp = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: temp,
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      text: messageData?.text,
      image: messageData?.image,
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...messages, optimisticMessage] });
    try {
      const res = await axiosInstance.post(
        `/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      set({ messages: messages });
      console.log(error);
    }
  },
}));

export default useChatStore;
