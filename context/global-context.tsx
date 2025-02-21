"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/get-unread-message-count";

// Create context
const GlobalContext = createContext<{
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}>({
  unreadCount: 0,
  setUnreadCount: (value: SetStateAction<number>) => {},
});

// Create provider
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
