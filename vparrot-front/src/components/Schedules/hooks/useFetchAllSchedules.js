import { useState, useEffect } from "react";
//Fonction du service pour effectuer la requête API
import { fetchAllSchedules } from "../schedulesService";

const useFetchAllSchedules = () => {

    //Etat pour stocker la liste des horaires
    const [schedules, setSchedules] = useState([]);
    //Suivi de l'état de chargement si besoin d'afficher un indicateur de chargement 
    const [loading, setLoading] = useState(false);
    //Etat pour stocker les erreurs eventuelles lors de la récupération des données
    const [error, setError] = useState(null);

    useEffect(() => {
        //Récuperation des données par fonction asynchrone
        const fetchData = async () => {

            try {

                setLoading(true);
                //Appelle de la focntion du service pour récupérer les données
                const schedulesList = await fetchAllSchedules();
                //Mise à jour de l"état avec les données récupérées
                setSchedules(schedulesList)
            } catch (error) {
                // En cas d'erreur, met à jour l'état d'erreur avec le message d'erreur.
                setError(error.message || "Une erreur est survenue lors de la récupération de la liste des horaires. ")
            } finally {
                //Arrêt de l'indicateur de chargement
                setLoading(false);
            }
        };

        //Apelle de fetchData au montage du composant
        fetchData();

    }, []);

    //retourne l état de la liste des horaires du chargement et des erreurs pour utilisation dans autre ocmposant
    return { schedules, loading, error}
}

//Export du hook pour l'utiliser ailleur dans l'application
export default useFetchAllSchedules;