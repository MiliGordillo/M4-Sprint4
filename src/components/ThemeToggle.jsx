// src/components/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className={
        "p-2 rounded-full transition shadow text-2xl flex items-center justify-center " +
        (darkMode
          ? "bg-[#A8DADC] text-[#2C2C2C] hover:bg-[#FFC1CC]"
          : "bg-[#B39CD0] text-white hover:bg-[#FFC1CC]")
      }
      title={darkMode ? "Modo claro" : "Modo oscuro"}
    >
      {darkMode ? (
        // Icono sol (modo claro)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        // Icono luna (modo oscuro)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;


