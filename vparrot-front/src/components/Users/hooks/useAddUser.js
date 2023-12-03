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
            if (error.response) {
                // Si c'est une erreur spécifique de l'API, utilisez son message
                showMessage({ message: error.response.data.message }, 'error');
            } else {
                // Pour les autres types d'erreurs, utilisez un message générique
                showMessage({ data: error || "Une erreur s'est produite" }, 'error');
            }
      
        } finally {

          setIsLoading(false);
        }
    };

    return { addNewUser, createUser, isLoading };
}

export default useAddUser;