import { useEffect, useState, useRef } from "react";
import { Episode } from "../types";

// Funcion para realizar las solicitudes de episodios al servidor
const fetchEpisodesData = async (episodeUrls: string[]) => {
  const episodeRequests = episodeUrls.map((url: string) =>
    fetch(url).then((res) => res.json())
  );
  return Promise.all(episodeRequests);
};

// Hook para gestionar la lista de episodios
const useEpisodeList = (characterEpisodes: string[]) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMoreEpisodes, setHasMoreEpisodes] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Funcion para cargar episodios desde la API
  const loadEpisodes = async (startIndex: number, endIndex: number) => {
    try {
      setIsFetching(true);
      const episodeUrls = characterEpisodes.slice(startIndex, endIndex);
      const episodeData = await fetchEpisodesData(episodeUrls);

      if (endIndex === 5) {
        // Para evitar un re-render al cargar los primeros 5 episodios
        setEpisodes(episodeData);
      } else {
        // Para cargar mas episodios manteniendo los anteriores en el estado
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...episodeData]);
      }

      // Verificar si hay mas episodios disponibles para cargar
      if (characterEpisodes.length > endIndex) {
        setHasMoreEpisodes(true);
      } else {
        setHasMoreEpisodes(false);
      }

      setIsFetching(false); // Finalizar la carga de datos
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setIsFetching(false);
    }
  };

  // Manejar el evento de cargar mas episodios al hacer click en el boton +
  const handleLoadMoreEpisodes = () => {
    const startIndex = page * 5;
    const endIndex = startIndex + 5;
    loadEpisodes(startIndex, endIndex);
    setPage(page + 1);
  };

  // Cargar los primeros 5 episodios al montar el componente
  useEffect(() => {
    loadEpisodes(0, 5);
  }, [characterEpisodes]);

  return {
    episodes,
    isFetching,
    containerRef,
    hasMoreEpisodes,
    handleLoadMoreEpisodes,
  };
};

export default useEpisodeList;
