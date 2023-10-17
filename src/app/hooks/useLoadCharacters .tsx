import { useState, useEffect } from "react";
import { Character } from "../types";

const useLoadCharacters = (initialCharacters: Character[]) => {
  const [originalCharacters, setOriginalCharacters] = useState<Character[]>(initialCharacters);
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(2);
  const [hasPrevCharacter, setHasPrevCharacter] = useState<boolean>(false);
  const [hasNextCharacter, setHasNextCharacter] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const loadMoreCharactersFromAPI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const data = await response.json();
      const newCharacters: Character[] = data.results;
      setOriginalCharacters([...originalCharacters, ...newCharacters]);
      setCharacters([...originalCharacters, ...newCharacters]);
      setStartIndex(startIndex + 4);
      setPage(page + 1);
    } catch (error) {
      console.error("Error loading characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreCharacters = () => {
    if (isSearching) {
      setHasPrevCharacter(true)
      // En modo de búsqueda, sólo permitir cargar más si hay más personajes en la lista actual
      if (startIndex + 4 < characters.length) {
        setStartIndex(startIndex + 4);
        setHasNextCharacter(false);
      }
      return;
    }

    if (startIndex + 4 < originalCharacters.length) {
      // Cargar personajes existentes
      setStartIndex(startIndex + 4);
      setHasPrevCharacter(true);
    } else if (page <= 43) {
      // Cargar personajes desde la API
      loadMoreCharactersFromAPI();
      setHasPrevCharacter(true);
    } else {
      // No hay más personajes para cargar
      setHasNextCharacter(false);
    }
  };

  const loadPrevCharacters = () => {
    const newIndex = startIndex - 4;
    if (newIndex >= 0 && newIndex < characters.length) {
      setStartIndex(newIndex);
      setHasNextCharacter(true);
      if (newIndex === 0) {
        setHasPrevCharacter(false);
      }
    }
  };

  const searchCharacter = async (textToSearch: string) => {
    // Restablecer flags de paginación
    setHasNextCharacter(false);
    setHasPrevCharacter(false);
  
    if (textToSearch === "") {
      setIsSearching(false);
      setCharacters(originalCharacters);
      setHasNextCharacter(true);
      setStartIndex(0);
      return;
    }
  
    const filteredCharacters = originalCharacters.filter((character) =>
      character.name.toLowerCase().includes(textToSearch.toLowerCase())
    );
  
    if (filteredCharacters.length > 0) {
      // Mostrar resultados de la búsqueda en los personajes originales
      setCharacters(filteredCharacters);
      setIsSearching(true);
    } else {
      // No se encontraron resultados en los personajes cargados, buscar en la API
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${textToSearch}`
        );
        const data = await response.json();
        const newCharacters: Character[] = data.results;
        setCharacters(newCharacters);
        setIsSearching(true);
        setHasNextCharacter(newCharacters.length > 0);
      } catch (error) {
        console.error("Error searching characters:", error);
        setCharacters([]);
        setIsSearching(true);
      }
    }
    // Restablecer el índice al principio para mostrar los primeros resultados
    setStartIndex(0);
  };
  

  useEffect(() => {
    // Restablecer el índice cuando los personajes iniciales cambian
    setStartIndex(0);
  }, [initialCharacters]);

  return {
    allCharacters: characters,
    characters: characters?.slice(startIndex, startIndex + 3),
    isLoading,
    loadMoreCharacters,
    loadPrevCharacters,
    searchCharacter,
    hasPrevCharacter,
    hasNextCharacter,
  };
};

export default useLoadCharacters;
