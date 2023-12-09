import { useState, useEffect } from 'react';
//Fonction du service pour récupérer la liste des services
import { fetchAllServicesGroupedByType } from '../serviceServices';


const useServicesGroupedByType  = () => {
    //Etat pour stocker les services récupérés
    const [servicesGroupedByType, setServiceGroupedByType] = useState({ entretien: [], carrosserie: [], reparation: []});
    //Gestion de l'indicateur de chargement
    const [loading, setLoading] = useState(true);
    //Etat pour stocker les erreurs éventuelles
    const [error, setError] = useState(null);

    useEffect(() => {
        //fonction asynchrone de récupération des données de services
        const fetchData = async () => {

            try {
                //Appelle de la fonction du service pour récupération des données
                const data = await fetchAllServicesGroupedByType();
                
                //Mise à jour de l'état avec les données récupérées
                setServiceGroupedByType(data);
                //Mise à jour de létat de chargement
                setLoading(false);
            } catch (error) {
                //Mise à jour de l'état d"erreur en cas d'erreur
                setError(error.message);
                //Mise à jour de l'état de chargement
                setLoading(false);
            }
        };

        //Appelle de fetchData au montage du composant
        fetchData();
    }, [])

    //Retourne les services par type l'état de chargement et les erreurs pour utilisation dans un autre composant
    return { servicesGroupedByType, loading, error };
};

export default useServicesGroupedByType;
