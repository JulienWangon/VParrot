import { useState } from 'react';

//Import fonction du service pour approuver un avis client
import { deleteTestimony } from '../testimoniesService';

//import du context de message pour afficher des notification
import { useMessage } from '../../../contexts/MessagesContext';

//Import context d'authentification pour récupérer des données utilisateurs;
import { useAuth} from '../../../contexts/AuthContext';


const useFetchDeleteTestimony = () => {

    const [isLoading, setIsLoading] = useState(false);
    ///Récupération du token csrf depuis le context d'authentification
    const { csrfToken } = useAuth();
    const { showMessage } = useMessage();

    const deleteThisTestimony = async (idTestimony) => {

        setIsLoading(true);

        try {

            const response = await deleteTestimony(idTestimony, csrfToken);
            showMessage({ data: response }, 'success');
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

            setIsLoading(false);
        }
    };

    return { deleteThisTestimony, isLoading};
};

export default useFetchDeleteTestimony;