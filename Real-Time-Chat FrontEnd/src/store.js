import { create } from "zustand";

export const userNameStore = create((set) => ({
  user: String(),
  setuser: (user) => set({ user: user }),
}));

export const useUserCodeStore = create((set) => ({
  code: String(),
  setcode: (code) => set({ code: code }),
  roomUsers: [],
  setRoomUsers: (users) => set({ roomUsers: users }),
  typingUsers: [],
  setTypingUsers: (users) =>
    set((state) => ({
      typingUsers:
        typeof users === "function" ? users(state.typingUsers) : users,
    })),
}));
