import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { toast } from "react-toastify";

function CharacterCard({ character, isFavorite, darkMode }) {
  const { addFavorite } = useContext(FavoritesContext);

  const handleAddToFavorites = () => {
    addFavorite(character);

    toast.success(
      <div className="flex items-center gap-3">
        <img
          src="morty.gif"
          alt="agregado"
          className="w-18 h-18 rounded-full"
        />
        <span>¡{character.name} fue agregado a favoritos!</span>
      </div>,
      {
        icon: false,
      }
    );
  };

  return (
    <div
      className={
        "rounded-xl shadow-lg p-4 text-center border backdrop-blur-md " +
        (darkMode
          ? "bg-[#2C2C2C]/80 text-white border-[#B39CD0]"
          : "bg-white/80 text-black border-[#A8DADC]")
      }
    >
      <img
        src={character.image}
        alt={character.name}
        className={
          "w-32 h-32 mx-auto rounded-full border-4 " +
          (darkMode ? "border-[#A8DADC]" : "border-[#B39CD0]")
        }
      />
      <h2 className={"text-lg font-bold mt-2 " + (darkMode ? "text-[#A8DADC]" : "text-[#B39CD0]")}>
        {character.name}
      </h2>
      <p className="text-sm text-dark">Especie: {character.species}</p>
      <p className="text-sm text-dark">Ubicación: {character.location.name}</p>

      {!isFavorite && (
        <button
          onClick={handleAddToFavorites}
          className={
            "mt-2 px-4 py-1 rounded transition " +
            (darkMode
              ? "bg-[#A8DADC] text-[#2C2C2C] hover:bg-[#FFC1CC] hover:text-[#2C2C2C]"
              : "bg-[#B39CD0] text-white hover:bg-[#FFC1CC] hover:text-black")
          }
        >
          Añadir a Favoritos
        </button>
      )}
    </div>
  );
}

export default CharacterCard;



