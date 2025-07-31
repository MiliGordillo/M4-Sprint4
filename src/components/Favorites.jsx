import React, { useContext, useRef } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaTrashAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function Favorites({ isOpen, onClose }) {
  const { favorites, removeFavorite, clearFavorites } = useContext(FavoritesContext);
  const { darkMode } = useContext(ThemeContext);
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const IMG_SIZE = 130;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backgroundColor: darkMode ? "rgba(30,34,40,0.85)" : "rgba(0,0,0,0.5)" }}
          onMouseDown={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            className={
              "relative w-full max-w-5xl mx-2 sm:mx-auto rounded-2xl shadow-2xl p-10 " +
              (darkMode ? "bg-[#232946] text-white" : "bg-white text-gray-900")
            }
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ overflowY: "hidden" }}
          >
            <button
              aria-label="Cerrar favoritos"
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition"
            >
              <FaTimes />
            </button>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <FaHeart className="text-pink-500 animate-pulse" /> Favoritos
            </h2>
            {favorites.length === 0 ? (
              <motion.p
                className="text-center text-lg italic opacity-70"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                No hay personajes agregados a favoritos.
              </motion.p>
            ) : (
              <>
                <div className="flex justify-end mb-6">
                  <motion.button
                    whileTap={{ scale: 0.95, rotate: -3 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      clearFavorites();
                      toast.error(
                        <div className="flex items-center gap-3">
                          <img
                            src="/public/morty.gif"
                            alt="eliminados"
                            className="w-20 h-20 rounded-full"
                          />
                          <span>Todos los favoritos fueron eliminados.</span>
                        </div>,
                        {
                          icon: false,
                        }
                      );
                    }}
                    className={
                      "flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition shadow-lg " +
                      (darkMode
                        ? "bg-red-700 text-white hover:bg-red-500"
                        : "bg-red-500 text-white hover:bg-red-400")
                    }
                  >
                    <FaTrashAlt className="inline-block" />
                    Eliminar todos los favoritos
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                  {favorites.map((fav) => (
                    <motion.div
                      key={fav.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 30 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <img
                        src={fav.image}
                        alt={fav.name}
                        className="rounded-full border-2 border-[#34D399] shadow mb-2"
                        style={{
                          width: IMG_SIZE,
                          height: IMG_SIZE,
                          objectFit: "cover",
                        }}
                      />
                      <h3
                        className={
                          "text-2xl font-bold text-center tracking-wide truncate w-[90%] mt-1 mb-1 " +
                          (darkMode ? "text-[#A8DADC]" : "text-[#1F2937]")
                        }
                        title={fav.name}
                      >
                        {fav.name}
                      </h3>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.04 }}
                        onClick={() => {
                          removeFavorite(fav.id);
                          toast.info(
                            <div className="flex items-center gap-3">
                              <img
                                src="/public/morty.gif"
                                alt="eliminado"
                                className="w-20 h-20 rounded-full"
                              />
                              <span>{fav.name} fue eliminado de favoritos.</span>
                            </div>,
                            {
                              icon: false,
                            }
                          );
                        }}
                        className={
                          "w-20 py-1 rounded-full text-[12px] font-semibold flex items-center justify-center gap-1 transition shadow " +
                          (darkMode
                            ? "bg-red-500 text-white hover:bg-red-400"
                            : "bg-red-600 text-white hover:bg-red-500")
                        }
                        style={{
                          minHeight: "24px",
                          minWidth: "60px",
                        }}
                      >
                        <FaTrashAlt size={10} />
                        Eliminar
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Favorites;





