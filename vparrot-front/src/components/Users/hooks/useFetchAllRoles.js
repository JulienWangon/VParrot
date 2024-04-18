import { useState, useEffect } from "react";
import { fetchAllRoles } from "../RolesService";
import { useMessage } from "../../../contexts/MessagesContext";

const useFetchAllRoles = () => {

    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { showMessage } = useMessage();

    useEffect(() => {

        const fetchData = async () => {

            setIsLoading(true);

            try {

                const response = await fetchAllRoles();
              
                if(response) {

                    setRoles(response);
                }  else {

                  showMessage({ data: "La récupération des utilisateurs a échoué" }, 'error');
                }
            } catch (error) {
             

              if (error.response && error.response.data && error.response.data.status === 'error') {
                showMessage({ message: error.response.data.message || "Erreur lors de l'opération" }, 'error');
              } else {
                showMessage({ message: error.message || "Une erreur s'est produite" }, 'error');
              }
            } finally {

                setIsLoading(false);
            }
        };

        fetchData();
    }, []) 
  
    return { roles, isLoading }
}

export default useFetchAllRoles;


