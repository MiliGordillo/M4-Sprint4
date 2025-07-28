import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";

function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="mt-4">
      {favorites.length === 0 ? (
        <p className="text-center text-sm italic opacity-70">
          No hay personajes agregados a favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className={
                "rounded-2xl p-5 shadow-md transition transform hover:scale-105 " +
                (darkMode
                  ? "bg-[#3A3A3A] text-white border border-[#B39CD0]"
                  : "bg-[#E3FCEC] text-black border border-[#34D399]")
              }
            >
              <img
                src={fav.image}
                alt={fav.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-[#34D399]"
              />
              <h3
                className={
                  "text-lg font-bold mt-4 text-center " +
                  (darkMode ? "text-[#A8DADC]" : "text-[#1F2937]")
                }
              >
                {fav.name}
              </h3>
              <button
                onClick={() => removeFavorite(fav.id)}
                className={
                  "mt-4 w-full py-2 rounded-full font-semibold transition " +
                  (darkMode
                    ? "bg-red-500 text-white hover:bg-red-400"
                    : "bg-red-600 text-white hover:bg-red-500")
                }
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;





