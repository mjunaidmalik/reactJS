import { useState, useEffect } from 'react';

function useDataFetching<T>(dataSource: string): [boolean, string, T[]] {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(dataSource);
        const result = await response.json();

        if (result) {
          setData(result);
        }
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    }

    fetchData();
  }, [dataSource]);

  return [loading, error, data];
}

export default useDataFetching;
