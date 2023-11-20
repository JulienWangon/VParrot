import { useState, useEffect } from "react";
import { fetchAllContact } from "../contactFormService";

const useFetchAllContact = () => {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

              setLoading(true);

              const contactsList = await fetchAllContact();
              setContacts(contactsList)
            } catch (error) {

                setError(error.message || 'Une erreur est survenue lors de la récupération de la liste des contacts.')
            } finally {

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { contacts, loading, error };
}

export default useFetchAllContact;