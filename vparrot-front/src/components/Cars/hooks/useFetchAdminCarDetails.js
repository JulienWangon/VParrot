import { useState, useEffect } from 'react';
import { fetchAdminCarDetails } from '../CarsService';


const useFetchAdminCarDetails = () => {

  const [carAdminDetails, setCarAdminDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

      const fetchDetails = async () => {
          setLoading(true);
          try {
              const data = await fetchAdminCarDetails();
              setCarAdminDetails(data);
              setError(null);
          } catch (error) {
              setError(error.message || "Failed to fetch car details.");
          } finally {
              setLoading(false);
          }
      };

      fetchDetails();
  }, []); 

  const refreshCarData = async () => {
    setLoading(true);
    try {
        const data = await fetchAdminCarDetails();
        setCarAdminDetails(data);
    } catch (error) {
        setError(error.message);
    }
    setLoading(false);
};

  return { carAdminDetails, error, loading, refreshCarData };
};

export default useFetchAdminCarDetails;