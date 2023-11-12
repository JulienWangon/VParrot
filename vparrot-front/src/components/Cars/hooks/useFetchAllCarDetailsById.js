import { useState, useEffect } from 'react';
import { fetchAllCarDetailsById } from '../CarsService';

const useFetchAllCarDetailsById = (carId) => {

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {

                if (!carId) {
                    setLoading(false);
                    return;
                }

                const data = await fetchAllCarDetailsById(carId);
                setCar(data);
            } catch (error) {

                setError(error.message || "Une erreur est survenue lors de la récupération des informations du véhicule. ");
            } finally {

                setLoading(false);
            }
        };

        fetchData();

    }, [carId]);

    return { car, loading, error };
};

export default useFetchAllCarDetailsById;