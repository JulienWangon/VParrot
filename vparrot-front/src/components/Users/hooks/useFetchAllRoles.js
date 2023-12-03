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
                console.log("Réponse complète dans le hook:", response);
                if(response) {

                    setRoles(response);
                }  else {

                  showMessage({ data: "La récupération des utilisateurs a échoué" }, 'error');
                }
            } catch (error) {
              console.log("Error:", error);

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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    console.log('Roles dans le hook:', roles);
    return { roles, isLoading }
}

export default useFetchAllRoles;


