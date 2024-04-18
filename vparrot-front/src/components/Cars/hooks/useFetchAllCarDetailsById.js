import { useState, useEffect } from 'react';
import { fetchAllCarDetailsById } from '../CarsService';

const useFetchAllCarDetailsById = () => {

    const [carId, setCarId] = useState(null);
    const [carDetails, setCarDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!carId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchAllCarDetailsById(carId);
                setCarDetails(data);
                setError(null);
            } catch (error) {
                setError(error.message || "Une erreur est survenue lors de la récupération des informations du véhicule.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [carId]);

    return { carDetails, loading, error, setCarId };
};
export default useFetchAllCarDetailsById;