import { useState } from 'react';

interface FetchOptions {
  [key: string]: unknown;
}

interface FetchResult<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  fn: (...args: unknown[]) => Promise<void>;
}

const useFetch = <T,>(
  cb: (options: FetchOptions, ...args: unknown[]) => Promise<T>,
  options: FetchOptions = {}
): FetchResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fn = async (...args: unknown[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fn };
};

export default useFetch;
