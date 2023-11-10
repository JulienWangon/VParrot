import { useState, useEffect } from 'react';
import { 
    fetchDistinctBrands, 
    fetchDistinctModels, 
    fetchDistinctFuelTypes, 
    fetchDistinctTransmissionTypes 
} from '../CarsService';

const useFetchCarFilterData = () => {

    const [filterData, setFilterData] = useState({
        brands: [],
        models: [],
        fuelTypes: [],
        transmissionTypes: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

              const [brands, models, fuelTypes, transmissionTypes] = await Promise.all([
                  fetchDistinctBrands(),
                  fetchDistinctModels(),
                  fetchDistinctFuelTypes(),
                  fetchDistinctTransmissionTypes()
              ]);

              setFilterData({ brands, models, fuelTypes, transmissionTypes });
            } catch (error) {

                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, []);

    return { filterData, loading, error};
}

export default useFetchCarFilterData;