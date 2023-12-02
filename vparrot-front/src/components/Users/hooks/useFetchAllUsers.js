import { useState, useEffect } from "react";
import { fetchAllUsers } from "../UsersService";
import { useMessage } from "../../../contexts/MessagesContext";

const useFetchAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { showMessage } = useMessage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchAllUsers();
               
                if (response) {
                    setUsers(response);
                } else {
                    showMessage({ message: "La récupération des utilisateurs a échoué" }, 'error');
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
    }, [showMessage]); 

    return { users, isLoading };
}

export default useFetchAllUsers;