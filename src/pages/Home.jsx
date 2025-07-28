import React, { useState, useEffect, useContext } from "react";
import { getCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { FavoritesContext } from "../context/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  const [species, setSpecies] = useState(() => localStorage.getItem("species") || "");
  const [status, setStatus] = useState(() => localStorage.getItem("status") || "");
  const [gender, setGender] = useState(() => localStorage.getItem("gender") || "");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const { favorites } = useContext(FavoritesContext);
  const { darkMode } = useContext(ThemeContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search && !species && !status && !gender) {
      toast.warning("Por favor ingresa al menos un filtro para buscar.");
      return;
    }

    // Armar los parámetros de query
    const params = new URLSearchParams();
    if (search) params.append("name", search);
    if (species) params.append("species", species);
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);

    setLoading(true);
    try {
      const data = await getCharacters(params.toString());
      setCharacters(data);
      setShowForm(false); // Oculta el formulario al buscar
      toast.success("Personajes cargados con éxito");
    } catch (error) {
      setCharacters([]);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setCharacters([]);
    setSearch("");
    setSpecies("");
    setStatus("");
    setGender("");
    setShowForm(true);
    localStorage.removeItem("search");
    localStorage.removeItem("species");
    localStorage.removeItem("status");
    localStorage.removeItem("gender");
  };

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("species", species);
    localStorage.setItem("status", status);
    localStorage.setItem("gender", gender);
  }, [search, species, status, gender]);

  return (
    <div className="max-w-5xl mx-auto">
      <AnimatePresence>
        {showForm && (
          <motion.form
            key="form"
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className={
              "w-full sm:w-[520px] flex flex-col gap-4 mb-8 mt-20 px-8 py-8 rounded-xl shadow-lg border backdrop-blur-md " +
              (darkMode
                ? "bg-[#232323]/80 border-[#B39CD0]"
                : "bg-white/80 border-[#A8DADC]")
            }
            style={{ marginLeft: 0, alignSelf: "flex-start" }}
          >
            <input
              type="text"
              placeholder="Buscar personaje..."
              className={
                "p-3 rounded-lg border outline-none transition-all shadow-sm " +
                (darkMode
                  ? "bg-[#2C2C2C] text-white border-[#B39CD0] focus:ring-2 focus:ring-[#A8DADC]"
                  : "bg-[#E4E4E4] text-black border-[#A8DADC] focus:ring-2 focus:ring-[#B39CD0]")
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className={
                "p-3 rounded-lg border shadow-sm transition-all " +
                (darkMode
                  ? "bg-[#2C2C2C] text-white border-[#B39CD0] focus:ring-2 focus:ring-[#A8DADC]"
                  : "bg-[#E4E4E4] text-black border-[#A8DADC] focus:ring-2 focus:ring-[#B39CD0]")
              }
            >
              <option value="">Especie (todos)</option>
              <option value="Human">Humano</option>
              <option value="Alien">Alienígena</option>
              <option value="Humanoid">Humanoide</option>
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Mythological Creature">Criatura Mítica</option>
              <option value="Animal">Animal</option>
              <option value="Robot">Robot</option>
              <option value="Cronenberg">Cronenberg</option>
              <option value="Disease">Enfermedad</option>
              <option value="Unknown">Desconocido</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={
                "p-3 rounded-lg border shadow-sm transition-all " +
                (darkMode
                  ? "bg-[#2C2C2C] text-white border-[#B39CD0] focus:ring-2 focus:ring-[#A8DADC]"
                  : "bg-[#E4E4E4] text-black border-[#A8DADC] focus:ring-2 focus:ring-[#B39CD0]")
              }
            >
              <option value="">Estado (todos)</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={
                "p-3 rounded-lg border shadow-sm transition-all " +
                (darkMode
                  ? "bg-[#2C2C2C] text-white border-[#B39CD0] focus:ring-2 focus:ring-[#A8DADC]"
                  : "bg-[#E4E4E4] text-black border-[#A8DADC] focus:ring-2 focus:ring-[#B39CD0]")
              }
            >
              <option value="">Género (todos)</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="genderless">Sin género</option>
              <option value="unknown">Desconocido</option>
            </select>

            <button
              type="submit"
              className={
                "px-6 py-3 rounded-lg font-semibold transition shadow " +
                (darkMode
                  ? "bg-[#A8DADC] text-[#2C2C2C] hover:bg-[#FFC1CC] hover:text-[#2C2C2C]"
                  : "bg-[#B39CD0] text-white hover:bg-[#FFC1CC] hover:text-black")
              }
            >
              Buscar
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {!showForm && (
        <div className="flex justify-start mb-8 mt-8">
          <button
            onClick={handleNewSearch}
            className={
              "px-6 py-3 rounded-lg font-semibold transition shadow " +
              (darkMode
                ? "bg-[#A8DADC] text-[#2C2C2C] hover:bg-[#FFC1CC] hover:text-[#2C2C2C]"
                : "bg-[#B39CD0] text-white hover:bg-[#FFC1CC] hover:text-black")
            }
          >
            Nueva búsqueda
          </button>
        </div>
      )}

      {loading && <Loader />}

      {!loading && characters.length > 0 && (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {characters.map((char) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CharacterCard
                  character={char}
                  isFavorite={favorites.some((fav) => fav.id === char.id)}
                  darkMode={darkMode}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Home;



