import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(url, {
        credentials: "include",
      });

      if (!res.ok) {
        setError("Failed to fetch");
      }
      const result = await res.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    error,
    loading,
    refetch,
  };
};

export default useFetch;
