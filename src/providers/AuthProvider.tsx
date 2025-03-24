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

import { Triangle } from "react-loader-spinner";

const Context = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>({
  user: { email: "", token: "" },
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ email: "", token: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const containrxUser = localStorage.getItem("containrx-user");
    if (containrxUser) setUser(JSON.parse(containrxUser));
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="dodgerblue"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useAuth = () => useContext(Context);

export default AuthProvider;
