import { useState} from 'react';
//import de la focntion du service pour créer un avis client
import { createTestimony } from '../testimoniesService';
//import du context de message pour afficher des notifications
import { useMessage } from '../../../contexts/MessagesContext';

const useFetchCreateTestimony = () => {

    //Utilisation du context de message pour afficher des notifications
    const { showMessage } = useMessage();

    //Etat pour l'indicateur de chargement
    const [loading, setIsLoading] = useState(false);
    
    //Fonction asynchrone pour créer un avis client
    const createNewTestimony = async (dataToSend) => {
        //Activation de l'indicateur de chargement
        setIsLoading(true);

        try {
            //Appelle de la focntion du service pour créer un avis client
            const response = await createTestimony(dataToSend);
            
            //Affiche le message de succès si réussite
            showMessage({ data: response }, 'success');
            return response;

        } catch (error) {
            //Affiche l'erreur et propagation de l erreur
            if (error.response && error.response.data) {
               
                showMessage({ data: error}, 'success');
            } else {
                
                showMessage({ data: { message: error.message || "Une erreur s'est produite" } }, 'error');
            }       
          throw error;

        } finally {
            //Désactive l'indicateur de chargement
            setIsLoading(false);
        }
    };

    //Retourne la fonction de création et létat de chargement
    return { createNewTestimony, loading};
}

export default useFetchCreateTestimony;