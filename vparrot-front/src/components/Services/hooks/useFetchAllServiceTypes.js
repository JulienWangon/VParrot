import { useState, useEffect } from 'react';

import { fetchAllServiceTypes } from '../serviceServices';

const useFetchAllServiceTypes = () => {

  const [type, setType] = useState(null);
  const [ error, setError] = useState(null);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
    
        const result = await fetchAllServiceTypes();
        if(result.success) {
          setType(result.data)
        } else {
          setError(result.error);
        }
        setLoading(false);
    };

    fetchData();
  }, []);

  return { type, error, loading };
}

export default useFetchAllServiceTypes;