"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { PullOutOfSession } from "@/lib/session";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const minLoadingTime = 5; // Минимальное время отображения загрузочного индикатора (2 секунды)

  useEffect(() => {
    const startTime = Date.now(); // Записываем время начала загрузки

    const fetchData = async () => {
      const user_data = await PullOutOfSession(); // Имитация запроса данных

      if (user_data) {
        setUser(user_data);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      const endTime = Date.now(); // Время окончания загрузки
      const loadingTime = endTime - startTime; // Реальное время загрузки

      // Вычисляем, нужно ли добавить дополнительную задержку
      const additionalDelay =
        minLoadingTime - loadingTime > 0 ? minLoadingTime - loadingTime : 0;

      setTimeout(() => {
        setIsLoading(false); // Завершение загрузки после задержки
      }, additionalDelay);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="flex justify-center items-center bg-transparent">
          <div>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin-slow" />
          </div>
          Please wait
        </div>
      </div>
    );
  }

  return (
    <SessionProvider>
      <AuthContext.Provider value={{ user, isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
