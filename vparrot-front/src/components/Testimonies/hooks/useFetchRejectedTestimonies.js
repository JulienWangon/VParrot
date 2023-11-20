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


  useEffect(() => {

      // Fonction asynchrone pour récupérer les témoignages rejetés.
      const fetchData = async () => {

          try {
              //appelle de la fonction du service pour récupérer les avis lcient rejeté
              const rejectedTestimonies = await getRejectedTestimonies();

              //Mise a jour de l'atat avec les avis client récupérés
              setTestimonies(rejectedTestimonies);
          } catch (error) {
              // En cas d'erreur, mise à jour de l'état d'erreur avec le message d'erreur.
              setError(error.message || "Une erreur est survenue lors de la récupération des témoignages. ")
          } finally {
              //Désactivation de l'état de chargement
              setLoading(false);
          }
      };

      //Appelle de la focntion fetchData au montage du composant
      fetchData();
  }, []);
  //Retourne les avis client rejeté l'état de chargement et les erreurs pour une utilisation dans autre composants
  return { testimonies, loading, error };   
}

export default useFetchRejectedTestimonies;