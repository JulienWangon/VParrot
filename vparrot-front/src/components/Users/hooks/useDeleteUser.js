import { useState } from "react";
import { deleteUser } from "../UsersService";
import { useMessage } from "../../../contexts/MessagesContext";
import { useAuth } from "../../../contexts/AuthContext";


const useDeleteUser = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { showMessage } = useMessage();
    const { csrfToken } = useAuth();

    const deletedUser = async (idUser) => {

        setIsLoading(true);

        try {

            const response = await deleteUser(idUser, csrfToken);
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

    return { deletedUser, isLoading};       
};

export default useDeleteUser;







