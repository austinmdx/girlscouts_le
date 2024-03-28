import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

let timeoutId = null;

export const AuthProvider = ({ children }) => {
  const [password, setPassword] = useLocalStorage("password");
  const navigate = useNavigate();

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setPassword(null);

    clearTimeout(timeoutId);

    navigate("/login", { replace: true });
  }, [navigate, setPassword]);

  const handleScheduleSignOut = useCallback(() => {
    const now = new Date();
    const timeUntil2AM = new Date(now);
    timeUntil2AM.setHours(2, 0, 0, 0); // Set the time to 2 AM

    if (now >= timeUntil2AM) {
      // If it's already past 2 AM today, set the time to 2 AM of the next day
      timeUntil2AM.setDate(timeUntil2AM.getDate() + 1);
    }
    const timeUntil2AMInMillis = timeUntil2AM - now;

    timeoutId = setTimeout(logout, timeUntil2AMInMillis);
  }, [logout]);

  // call this function when you want to authenticate the user
  const login = useCallback(
    async (data) => {
      setPassword(
        JSON.stringify({
          value: data,
          timeStored: Date.now(),
        }),
      );
      handleScheduleSignOut();
      navigate("/");
    },
    [handleScheduleSignOut, navigate, setPassword],
  );

  const value = useMemo(
    () => ({
      password: password ? JSON.parse(password) : null,
      login,
      logout,
    }),
    [login, logout, password],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
