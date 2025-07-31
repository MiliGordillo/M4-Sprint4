import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const Header = ({ onOpenFavorites }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <header
      className={
        "grid grid-cols-3 items-center px-6 py-4 border-b shadow-lg " +
        (darkMode
          ? "bg-[#1F1F1F]/80 text-white border-[#B39CD0]"
          : "bg-[#F8F8F8]/70 text-black border-[#A8DADC]")
      }
      style={{
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      {/* Logo a la izquierda */}
      <motion.div
        className="flex items-center justify-start"
        style={{ height: "56px" }}
      >
        <motion.img
          src="/public/logo.png"
          alt="Logo"
          className="h-20 w-auto max-h-full"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ objectFit: "contain" }}
        />
      </motion.div>
      <div className="flex justify-center">
        <button
          onClick={onOpenFavorites}
          className={
            "flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition " +
            (darkMode
              ? "bg-[#B39CD0] text-[#1F1F1F] hover:bg-[#A8DADC]"
              : "bg-[#A8DADC] text-[#1F1F1F] hover:bg-[#B39CD0] hover:text-white")
          }
          title="Ver favoritos"
        >
          <span className="text-xl">Mis personajes favoritos de Rick y Morty</span>
        </button>
      </div>
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;