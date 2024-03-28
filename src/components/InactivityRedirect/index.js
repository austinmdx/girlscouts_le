import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const InactivityRedirect = ({ timeoutInMinutes = 2, redirectPath = "/" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { password, logout } = useAuth();

  useEffect(() => {
    if (password && password?.timeStored) {
      const now = new Date();
      const loggedInTime = new Date(password?.timeStored);
      const timeUntil2AM = new Date(loggedInTime);
      timeUntil2AM.setHours(2, 0, 0, 0); // Set the time to 2 AM

      if (loggedInTime >= timeUntil2AM) {
        // If it's already past 2 AM today, set the time to 2 AM of the next day
        timeUntil2AM.setDate(timeUntil2AM.getDate() + 1);
      }

      if (now > timeUntil2AM) {
        logout();
      }
    }
  }, [logout, password]);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(
        () => {
          navigate(redirectPath);
        },
        timeoutInMinutes * 60 * 1000,
      );
    };

    const handleActivity = () => {
      if (location?.pathname !== "/") {
        resetTimer();
      }
    };

    // Listen for user activity events
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    // Initial setup for the timer
    resetTimer();

    // Clean up event listeners on unmount
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, [redirectPath, timeoutInMinutes, navigate, location?.pathname]);

  return null;
};

export default InactivityRedirect;
