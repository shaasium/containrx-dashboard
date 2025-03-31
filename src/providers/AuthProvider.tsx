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
  user: { email: "", token: "" },
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({ email: "", token: "" });

  useEffect(() => {
    const userExists = localStorage.getItem("containrx-user");
    if (userExists) setUser(JSON.parse(userExists));
    setIsLoading(false);
  }, []);

  if (isLoading) return <p>Loading</p>;

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useAuth = () => useContext(Context);

export default AuthProvider;
