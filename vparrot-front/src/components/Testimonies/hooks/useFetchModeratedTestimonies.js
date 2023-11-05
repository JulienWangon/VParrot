import { useState, useEffect} from 'react';
import { fetchModeratedTestimonies } from '../testimoniesService';

const useFetchModeratedTestimonies = () => {

    const [testimonies, setTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = null;


    useEffect(() => {

        const fetchData = async () => {

            try {

              const moderatedTestimonies = await fetchModeratedTestimonies();
              setTestimonies(moderatedTestimonies);
            } catch (error) {

              setError(error.message || "Une erreur est survenue lors de la récupération des témoignages. ")
            } finally {

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { testimonies, loading, error };   
}

export default useFetchModeratedTestimonies;