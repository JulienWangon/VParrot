import { useState, useEffect } from "react";
import { fetchSchedules } from "../footerService";

const useFetchSchedules = () => {

    //Etat pour stocker les horaires 
    const [schedules, setSchedules] = useState([]);
    //Etat pour l'indicateur de chargmement
    const [loading, setLoading] = useState(true);
    //Etat pour les erreurs eventuelles
    const [error, setError] = useState(null);

    useEffect (() => {
        //fonction asynchrone pour récupérer les horaires d'ouverture
        const fetchData = async () => {
        
            try {
                //Appelle a la fonction du service pour récupérer les horaires
                const schedules = await fetchSchedules();
                //Mise a jour de l'état avec les données récupérées
                setSchedules(schedules);

            } catch (error) {
            //Mise à jour de l'état d'erreur 
              setError(error.message || "Une erreur est survenue lors de la récupération des horaires d'ouverture. ")
            } finally {
                //Désactivation de l'indicateur de chargement
                setLoading(false);
            }
        };
        //Appelle a la focntion au montage du composant
        fetchData();
    }, []);
    // retourne les horaires l indicateur de chargement et les erreurs
    return { schedules, loading, error };
}

export default useFetchSchedules;

