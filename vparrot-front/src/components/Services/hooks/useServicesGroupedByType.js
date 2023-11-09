import { useState, useEffect } from 'react';
import { fetchAllServicesGroupedByType } from '../serviceServices';


const useServicesGroupedByType  = () => {

    const [servicesGroupedByType, setServiceGroupedByType] = useState({ entretien: [], carrosserie: [], reparation: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const data = await fetchAllServicesGroupedByType();
                console.log("Données récupérées:", data);
                setServiceGroupedByType(data);
                setLoading(false);
            } catch (error) {

                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    return { servicesGroupedByType, loading, error };
};

export default useServicesGroupedByType;
