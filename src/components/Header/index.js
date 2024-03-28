import React from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

const Header = () => {
  const [locale, setLocale] = useLocalStorage("locale");
  const { pathname } = useLocation();

  if (pathname === "/login" || pathname === "/style-guide") {
    return null;
  }

  const handleLanguageChange = () => {
    setLocale((!locale || locale === "en") ? "es" : "en");
    window.location.reload();
  };

  return (
    <div className="w-full z-50 bg-white fixed top-0 header">
      <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-10 lg:mx-auto py-4 flex items-center justify-between">
        <Link to={'/'}>
          <img
            src="/images/gsle-green_logo.png"
            alt="girlscouts"
            className="w-[190px]"
          />
        </Link>
        {/* <button
          className="bg-black text-2xl text-white font-bold rounded-md p-2 uppercase"
          onClick={handleLanguageChange}
        >
          {(!locale || locale === "en") ? "es" : "en"}
        </button> */}
      </div>
    </div>
  );
};

export default Header;
