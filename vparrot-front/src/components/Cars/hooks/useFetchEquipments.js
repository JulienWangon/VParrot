import { useState, useEffect } from 'react';
import { fetchAllEquipmentByType } from '../CarsService'; 



const useFetchEquipments = () => {
    const [equipments, setEquipments] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const data = await fetchAllEquipmentByType();
                setEquipments(data);
                setError(null);
            } catch (err) {
                console.error("Erreur lors de la récupération des équipements:", err);
                setError(err.message || 'Erreur lors de la récupération des équipements');
            } finally {
                setLoading(false);
            }
        };

        fetchEquipments();
    }, []);

    return { equipments, loading, error };
};

export default useFetchEquipments;
