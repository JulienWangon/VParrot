import { useState, useEffect} from 'react';

//import fonction du service pour la liste des avis client validés
import { fetchModeratedTestimonies } from '../testimoniesService';

const useFetchModeratedTestimonies = () => {

    // État pour stocker les témoignages.
    const [testimonies, setTestimonies] = useState([]);

    // État pour gérer l'indicateur de chargement.
    const [loading, setLoading] = useState(true);

    // État pour gérer les erreurs potentielles.
    const [error, setError] = useState(null);


    const fetchData = async () => {
      setLoading(true);
      try {
          // Appel de la fonction du service pour récupérer les témoignages
          const moderatedTestimonies = await fetchModeratedTestimonies();
        
          // Mise à jour de l'état avec les témoignages récupérés.
          setTestimonies(moderatedTestimonies);
      } catch (error) {
        console.error("fetchData: Erreur lors de l'appel API", error);
          // En cas d'erreur, mise à jour de l'état d'erreur avec le message d'erreur.
          setError(error.message || "Une erreur est survenue lors de la récupération des témoignages.");
      } finally {
          // Désactivation de l'état de chargement
          setLoading(false);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

  

    //Retourne les état testimonies loading et error pour une utilisation dans un autre composant
    return { testimonies, loading, error };   
}

export default useFetchModeratedTestimonies;