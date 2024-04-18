import { useState, useEffect } from 'react';
import { fetchAllTreatedContact } from '../contactFormService';


const useFetchAllTreatedContacts = () => {

    const [treatedContacts, setTreatedContacts] = useState({ enCours: [], traite: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {

              const result = await fetchAllTreatedContact();
              setTreatedContacts({ enCours: result['en cours'], traite: result['traité']});
              setIsLoading(false);

            } catch(error) {

                setIsLoading(false);
                setError(error.message || 'Une erreur est survenue lors de la récupération de la liste des contacts traité.')             
            }

        };

        fetchData();
    }, []);

    return { treatedContacts, isLoading, error };
};

export default useFetchAllTreatedContacts;
