import { useState} from 'react';
import { addUser } from '../UsersService';
import { useMessage } from '../../../contexts/MessagesContext';
import { useAuth } from '../../../contexts/AuthContext';


const useAddUser = () => {

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [createUser, setCreateUser] = useState([]);

    const { csrfToken } = useAuth();

    const addNewUser = async (userData) => {

        setIsLoading(true);

        try {

            const response = await addUser(userData, csrfToken);
            setCreateUser(userData);

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

    return { addNewUser, createUser, isLoading };
}

export default useAddUser;