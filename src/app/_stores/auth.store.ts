import { create } from "zustand";
import { UserSession } from "../_types/auth.types";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface SessionStatus {
  session: UserSession | null;
  status: AuthStatus;
  clearSession: () => void;
  updateSession: () => void;
}

const fetchSessionFromAPI = async () => {
  try {
    const response = await fetch("/api/auth/session");
    if (response.ok) {
      const data = await response.json();
      return data
        ? { session: data, status: "authenticated" as AuthStatus }
        : { session: null, status: "unauthenticated" as AuthStatus };
    }
    return { session: null, status: "unauthenticated" as AuthStatus };
  } catch {
    return { session: null, status: "unauthenticated" as AuthStatus };
  }
};

export const useSessionStore = create<SessionStatus>((set) => ({
  session: null,
  status: "loading",
  clearSession: () => set({ session: null, status: "unauthenticated" }),
  updateSession: async () => {
    const { session, status } = await fetchSessionFromAPI();
    set({ session, status });
  },
}));

if (typeof window !== "undefined") {
  useSessionStore.getState().updateSession();
}
