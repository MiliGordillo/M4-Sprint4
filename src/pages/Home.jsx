import React, { useState, useEffect, useContext } from "react";
import { getCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { FavoritesContext } from "../context/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserAlt, FaVenusMars, FaHeartbeat, FaRedo } from "react-icons/fa";

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
    <div className="max-w-7xl mx-auto flex flex-row">
      <AnimatePresence>
        {showForm && (
          <motion.form
            key="form"
            onSubmit={handleSearch}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className={
              "fixed left-0 top-24 z-30 flex flex-col gap-6 px-10 py-12 rounded-r-2xl shadow-2xl border-l-0 border-t-0 border-b-0 border-r backdrop-blur-md " +
              (darkMode
                ? "bg-[#232323]/95 border-[#B39CD0] text-white"
                : "bg-white/95 border-[#A8DADC] text-black")
            }
            style={{
              minWidth: "340px",
              maxWidth: "400px",
              borderLeft: "none",
              marginTop: "0px",
            }}
          >
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <FaSearch className={darkMode ? "text-[#A8DADC]" : "text-[#B39CD0]"} />
              Buscar Personaje
            </h2>
            <div className="flex flex-col gap-2">
              <label className="font-semibold flex items-center gap-2 text-sm">
                <FaUserAlt />
                Nombre
              </label>
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold flex items-center gap-2 text-sm">
                <FaUserAlt />
                Especie
              </label>
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
                <option value="">Todas</option>
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold flex items-center gap-2 text-sm">
                <FaHeartbeat />
                Estado
              </label>
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
                <option value="">Todos</option>
                <option value="alive">Vivo</option>
                <option value="dead">Muerto</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold flex items-center gap-2 text-sm">
                <FaVenusMars />
                Género
              </label>
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
                <option value="">Todos</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="genderless">Sin género</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>

            <button
              type="submit"
              className={
                "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow text-lg " +
                (darkMode
                  ? "bg-[#A8DADC] text-[#2C2C2C] hover:bg-[#FFC1CC] hover:text-[#2C2C2C]"
                  : "bg-[#B39CD0] text-white hover:bg-[#FFC1CC] hover:text-black")
              }
            >
              <FaSearch />
              Buscar
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="flex-1 min-h-[80vh] flex flex-col items-center justify-center">
        {!showForm && (
          <div className="flex justify-start mb-8 mt-8">
            <button
              onClick={handleNewSearch}
              className={
                "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow " +
                (darkMode
                  ? "bg-[#A8DADC] text-[#2C2C2C] hover:bg-[#FFC1CC] hover:text-[#2C2C2C]"
                  : "bg-[#B39CD0] text-white hover:bg-[#FFC1CC] hover:text-black")
              }
            >
              <FaRedo />
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
    </div>
  );
}

export default Home;