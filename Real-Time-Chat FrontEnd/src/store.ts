import { create } from 'zustand'

interface UserStore {
    user: string
    setuser: (user: string) => void
}

interface RoomUser {
    name: string;
    isAdmin: boolean;
}

interface CodeStore {
    code: string
    setcode: (code: string) => void
    roomUsers: RoomUser[]
    setRoomUsers: (users: RoomUser[]) => void
    typingUsers: string[]
    setTypingUsers: (users: string[] | ((prev: string[]) => string[])) => void
}

export const userNameStore = create<UserStore>((set) => ({
    user: String(),
    setuser: (user: string) => set({ user: user }),
}))

export const useUserCodeStore = create<CodeStore>((set) => ({
    code: String(),
    setcode: (code: string) => set({ code: code }),
    roomUsers: [],
    setRoomUsers: (users: RoomUser[]) => set({ roomUsers: users }),
    typingUsers: [],
    setTypingUsers: (users) => set((state) => ({
        typingUsers: typeof users === 'function' ? users(state.typingUsers) : users
    })),
}))
