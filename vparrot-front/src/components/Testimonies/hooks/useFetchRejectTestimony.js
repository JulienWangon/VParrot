import { useState } from "react";
//focntion du service pour rejeter un avis client 
import { rejectTestimony } from "../testimoniesService";
//Context de message pour afficher des notifications
import { useMessage } from "../../../contexts/MessagesContext"
//Import context d'authentification pour récupérer des données utilisateurs;
import { useAuth} from '../../../contexts/AuthContext';

const useFetchRejectTestimony = () => {

    //utilisationc ontext de message pour afficher des notifications
    const { showMessage } = useMessage();
    //Etat pour suivre l'idicateur de chargement
    const [isloading, setIsLoading] = useState(false);
    //Récuperation du token csrf via le context d'authentification
    const { csrfToken } = useAuth();

    //fonction asynchrone pour rejeter u navis client
    const rejectThisTestimony = async (idTestimony) => {
        
        //Activiation de l'indicateur de chargement
        setIsLoading(true);

        try {
            //Appelle a la focntion du service pour rejeter un avis client
            const response = await rejectTestimony(idTestimony, csrfToken);
            //Affichage du message de succès
            showMessage({ data: response }, 'success');
           
            return response;
        } catch (error) {
            //Affichage de l'erreur et propagation
            if (error.response && error.response.data) {
               
                showMessage({ data: error}, 'error');
            } else {
                
                showMessage({ data: { message: error.message || "Une erreur s'est produite" } }, 'error');
            }       
            throw error;

        }finally {
            //Désactivation de lindicateur de chargement
            setIsLoading(false);
        }    
    } ;
    
    //Rtourne la focntion de rejet des avis client et l etat de chargement
    return { rejectThisTestimony, isloading };
}

export default useFetchRejectTestimony;