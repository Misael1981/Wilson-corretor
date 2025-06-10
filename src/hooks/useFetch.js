// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]); // <-- Mude de null para []
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... restante do seu hook ...

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Erro HTTP! Status: ${response.status} - ${response.statusText}`
        );
      }
      const result = await response.json();
      setData(result); // Se a API retornar [], data será []
    } catch (err) {
      console.error("Erro ao buscar dados com useFetch:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
