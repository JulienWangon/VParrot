import { useState } from "react";
import { fetchFilteredCars } from "../CarsService";

const useFetchFilteredCars = () => {

    const [filteredCars, setFilteredCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const onApplyFilter = async (filters) => {

        setError(null);

        const cleanedFilters = Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => value)
      );

        
        try {

            const data = await fetchFilteredCars(cleanedFilters);
            setFilteredCars(data);
        } catch (error) {

          console.error('Erreur lors du filtrage des voitures:', error);
          setError(error);
  
        }finally {
            setLoading(false);
        }
    };

    const resetFilter = () => {
        setFilteredCars(null);
    };

    return { filteredCars, loading, error, onApplyFilter, resetFilter}
}

export default useFetchFilteredCars;