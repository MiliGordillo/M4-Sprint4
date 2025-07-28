import React, { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Favorites from "./Favorites";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Header = ({ categoryNames = [], selectedCategory, setSelectedCategory }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [showFavorites, setShowFavorites] = useState(false);
  const favRef = useRef(null);

  // ⛔️ Cierra el panel si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (favRef.current && !favRef.current.contains(event.target)) {
        setShowFavorites(false);
      }
    };

    if (showFavorites) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFavorites]);

return (
    <header
        className={
            "flex justify-between items-center px-6 py-4 border-b shadow-lg " +
            (darkMode
                ? "bg-[#1F1F1F] text-white border-[#B39CD0]"
                : "bg-[#F8F8F8] text-black border-[#A8DADC]")
        }
    >
        <h1 className="text-3xl font-extrabold tracking-tight">Buscador de Personajes</h1>

        <div className="flex gap-4 items-center relative">
            {/* Botón favoritos */}
            <button
                onClick={() => setShowFavorites((prev) => !prev)}
                aria-pressed={showFavorites}
                className={
                    "flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition " +
                    (darkMode
                        ? "bg-[#B39CD0] text-[#1F1F1F] hover:bg-[#A8DADC]"
                        : "bg-[#A8DADC] text-[#1F1F1F] hover:bg-[#B39CD0] hover:text-white")
                }
                title="Ver favoritos"
            >
                <span className="text-xl">
                Favoritos
                </span>
            </button>

            {/* Panel animado de favoritos */}
            <AnimatePresence>
                {showFavorites && (
                    <motion.div
                        ref={favRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute right-0 top-16 z-50 w-[400px] max-w-[95vw]"
                    >
                        {/* Flecha decorativa */}
                        <div className="absolute right-6 -top-2 w-4 h-4 bg-inherit rotate-45 border-t border-l 
                            border-white dark:border-[#B39CD0]" />

                        {/* Fondo tipo glass */}
                        <div
                            className={
                                "rounded-2xl shadow-2xl border p-6 max-h-[500px] overflow-y-auto backdrop-blur-md " +
                                (darkMode
                                    ? "bg-[#2C2C2C]/80 border-[#B39CD0]"
                                    : "bg-white/80 border-[#A8DADC]")
                            }
                        >
                            <h2
                                className={
                                    "text-xl font-bold mb-4 " +
                                    (darkMode ? "text-[#A8DADC]" : "text-[#B39CD0]")
                                }
                            >
                                Favoritos
                            </h2>
                            <Favorites />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón para toggle de tema */}
            <ThemeToggle />
        </div>
    </header>
);
};

export default Header;






