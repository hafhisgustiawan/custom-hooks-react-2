import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyDataFn) => {
    const { url, method, headers, body } = requestConfig;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) throw new Error('Request failed!');
      const data = await response.json();
      applyDataFn(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { sendRequest, isLoading, error };
};

export default useHttp;
