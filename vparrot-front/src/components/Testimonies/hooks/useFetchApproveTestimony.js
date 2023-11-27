import { useState } from 'react';

//Import fonction du service pour approuver un avis client
import { approveTestimony } from '../testimoniesService';

//import du context de message pour afficher des notification
import { useMessage } from '../../../contexts/MessagesContext';

//import du context d'authentification pour récupérer des données utilisateur
import { useAuth} from '../../../contexts/AuthContext';

const useFetchApproveTestimony = () => {

    //Utilisation du context pour afficher des notifications
    const { showMessage } = useMessage();

    //Etat pour gérer l'indicateur de chargement
    const [isLoading, setIsLoading] = useState(false);

    ///Récupération du token csrf depuis le context d'authentification
    const { csrfToken } = useAuth();

    //Focntion asynchrone pour approuver un avis client
    const approveThisTestimony = async (idTestimony, onSuccess) => {
     
        //Activation de l'indicateur de chargement
        setIsLoading(true);

        try {
            //Appelle a la fonction du service pour approuver l avis client
            const response = await approveTestimony(idTestimony, csrfToken);
          
            //Affichage du message de succès via le context message
            showMessage({ data: response }, 'success');
            onSuccess();

            return response;
        } catch (error) {
           //Gestion des erreurs
            if (error.response && error.response.data && error.response.data.status === 'error') {
            //Affichage erreur provenant de la reponse API 
                showMessage({ message: error.response.data.message || "Erreur lors de l'opération" }, 'error');
            } else {
            //Affichage autre erreur (exemple erreur reseau)
                showMessage({ message: error.message || "Une erreur s'est produite" }, 'error');
            }
        } finally {

            //Désactivation de l'indicateur de chargement
            setIsLoading(false);
        }
    };

    //Retourne la fonction d'approbation et létat de chargmeent pour une utilisation ultèrieur
    return { approveThisTestimony, isLoading };
}

export default useFetchApproveTestimony;