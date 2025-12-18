"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserType = {
  id: string;
  fullName: string;
  email: string;
  isAdmin?: boolean;
  isVerified?: boolean;
};

type UserStore = {
  user: UserType | null;
  hydrated: boolean;
  setUser: (user: UserType | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,

      setUser: (user) => {
        set({ user }); // persist automatically saves to localStorage
      },

      logout: () => {
        // persist automatically removes "user", but token is manual
        localStorage.removeItem("token");
        set({ user: null });
      },
    }),

    {
      name: "user-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
      partialize: (state) => ({ user: state.user }), // only store user
    }
  )
);