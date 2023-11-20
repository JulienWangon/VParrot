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

    useEffect(() => {
        //Focntion asynchrone pour récupérer les avis client non modérés
        const testimoniesForModeration = async () => {

            try {
                //Appelle a la fonction de service pour récupérer la liste des avis client
                const unModeratedTestimonies = await getUnmoderatedTestimonies();
                //Mise à jour de létat avec les données récupérées
                setTestimonies(unModeratedTestimonies.data);   
            } catch (error) {
                
                setError(error.message || "Une erreur est survenue lors de la récupération des témoignages." );
                throw error;

            } finally {
                //Désactivation de l'état de chargement
                setLoading(false);   
            }
          };

        //Appelle a la fonction au montage du composant
        testimoniesForModeration();
    }, []);
    //Retourne les avis non modérés l état de chargement et les erreurs
    return { testimonies, loading, error};   
};

export default useGetUnmoderatedTestimonies;