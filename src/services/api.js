import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = async (queryString) => {
  try {
    const url = queryString ? `${BASE_URL}/?${queryString}` : BASE_URL;
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw new Error("No se encontraron personajes con esos filtros.");
  }
};

