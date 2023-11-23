import { useState } from "react";
//Fonction du service pour mise a jour des horaires d'ouverture
import { fetchUpdateSchedules } from "../schedulesService";
//context pour affichage des messages retournés par l API
import { useMessage } from "../../../contexts/MessagesContext";
//Context d'authentification pour récupérer des données liées à l'utilisateur
import { useAuth } from '../../../contexts/AuthContext';


const useFetchUpdateSchedule = () => {
    // utilisation du context de message pour afficher des notifications
    const { showMessage} = useMessage();
    //Gestion de l'indicateur de chargement
    const [isLoading, setIsLoading] = useState(false);
    //Récupération du token csrf depuis le context d'authentification
    const { csrfToken } = useAuth();

    //Focntion asynchrone pour mise à jour de l'horaire sélectionnée
    const updateThisSchedule = async (idOpeningDay, scheduleData) => {
        //Activation de l'état de chargement
        setIsLoading(true);

        try {
            //Appelle de la focntion du service pour effectuer la mise à jour de l'horaire
            const response = await fetchUpdateSchedules(idOpeningDay, scheduleData, csrfToken);
            //Affichage message de success via le context de message
            showMessage({ data: response }, 'success');
            return response;
        } catch (error) {
            //Affichage du message d'erreur et propagation de l'erreur
            if (error.response && error.response.data) {
               
                showMessage({ data: error}, 'success');
            } else {
                
                showMessage({ data: { message: error.message || "Une erreur s'est produite" } }, 'error');
            }       
        } finally {
            //Désactivation de l'indicateur de chargement
            setIsLoading(false);
        }
    };

    return  { updateThisSchedule, isLoading };
}

export default useFetchUpdateSchedule;