import axios from "axios";
import { useEffect, useState } from "react";

type UseFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

function useFetch<T>(
  url: string | null,
  dependencies: unknown[] = []
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, ...dependencies]);

  return { data, isLoading, error };
}

export default useFetch;
