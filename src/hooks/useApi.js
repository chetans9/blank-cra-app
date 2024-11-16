import { useState, useCallback } from "react";

type UseApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (params?: any) => Promise<void>;
};

function useApi<T>(apiFunction: (params?: any) => Promise<{ data: T }>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params?: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(params);
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
}

export default useApi;
