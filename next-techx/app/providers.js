"use client";
import { PullOutOfSession } from "@/components/logicians/PullOutOfSession";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    // Здесь также может быть логика сохранения токена аутентификации в localStorage или cookies
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    // Очистка данных аутентификации из хранилища
    // localStorage.removeItem("user");
  };

  useEffect(() => {
    const fetchData = async () => {
      const user_data = await PullOutOfSession(); // Замените на вашу реальную функцию получения данных сессии
      //const [isAuthInitializing, setIsAuthInitializing] = useState(true);

      if (user_data) {
        console.log(user_data.name, user_data.email);
        setUser(user_data);
        setLoggedIn(true);
      } else {
        console.log("FALSE SESSION");
        setLoggedIn(false);
      }
      //setIsAuthInitializing(false);
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
