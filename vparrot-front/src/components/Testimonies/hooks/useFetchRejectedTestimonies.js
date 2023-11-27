import { useState, useEffect } from "react";
//Focntion du service pour obtenir les avis client rejetés
import { getRejectedTestimonies } from "../testimoniesService";


const useFetchRejectedTestimonies = () => {

  //Etat pour stocker les avis client rejetés
  const [testimonies, setTestimonies] = useState([]);
  //gestion de l'indicateur de chargement
  const [loading, setLoading] = useState(true);
  //Etat pour gérer les erreurs potentielles
  const [error, setError] = useState(null);


    const fetchData = async () => {
        setLoading(true);
        try {
            const rejectedTestimonies = await getRejectedTestimonies();
            
            setTestimonies(rejectedTestimonies);
    
        } catch (error) {
            setError(error.message || "Une erreur est survenue lors de la récupération des témoignages.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        
    }, []);

   



  //Retourne les avis client rejeté l'état de chargement et les erreurs pour une utilisation dans autre composants
  return { testimonies, loading, error };   
}

export default useFetchRejectedTestimonies;