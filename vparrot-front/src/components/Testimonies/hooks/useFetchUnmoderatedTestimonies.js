import { useState, useEffect} from 'react';
//focntion du service pour obtenir la liste des avis client non modérés
import { getUnmoderatedTestimonies } from '../testimoniesService';

const useGetUnmoderatedTestimonies = () => {
    
    //Etat pour stoker les messages non modérés
    const [testimonies, setTestimonies] = useState([]);

    //Etat pour gérer l indicateur de chargement
    const [loading, setLoading] = useState(true);

     // État pour gérer les erreurs potentielles.
     const [error, setError] = useState(null);

     const fetchData = async () => {
        setLoading(true);
        try {
            const unModeratedTestimonies = await getUnmoderatedTestimonies();
            setTestimonies(unModeratedTestimonies.data);
        } catch (error) {
            setError(error.message || "Une erreur est survenue lors de la récupération des témoignages.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    //Retourne les avis non modérés l état de chargement et les erreurs
    return { testimonies, loading, error};   
};

export default useGetUnmoderatedTestimonies;