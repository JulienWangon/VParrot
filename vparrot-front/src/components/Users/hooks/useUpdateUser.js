import { useState } from "react";
import { updateUser } from "../UsersService";
import { useMessage } from "../../../contexts/MessagesContext";
import { useAuth } from "../../../contexts/AuthContext";


const useUpdateUser = () => {

    const { showMessage} = useMessage();
    const { csrfToken } = useAuth();
    const [ isLoading, setIsLoading ] = useState(false);

    const updateExistingUser = async (userData) => {
    
        setIsLoading(true);

        try {
            const { idUser, ...formData } = userData;
            const response = await updateUser(idUser, formData, csrfToken);
            showMessage({data: response }, 'success');
            return response.user;
        } catch (error) {

            if(error.response) {

                showMessage({ data: error.response.data.message }, 'error')
            } else   {

              showMessage({ data: error || "Une erreur s'est produite" }, 'error');
            } 
        } finally {
              
          setIsLoading(false);
      }
    };

    return { updateExistingUser, isLoading};

}

export default useUpdateUser;