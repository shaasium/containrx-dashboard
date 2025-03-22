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

const Context = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>({
  user: {
    email: "",
    _id: "",
    token: "",
  },
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const containrxUser = localStorage.getItem("containrx-user");
    if (containrxUser) setUser(JSON.parse(containrxUser));
  }, []);

  const [user, setUser] = useState<User>({ email: "", _id: "", token: "" });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useAuth = () => useContext(Context);

export default AuthProvider;
