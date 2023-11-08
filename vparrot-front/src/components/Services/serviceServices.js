import axios from 'axios';

//Get all services grouped by ype
export const fetchAllServicesGroupedByType = async () => {

    try {

        const response = await axios.get('http://localhost/vparrot/services');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {
    
        console.error('Erreur lors de la récupération des témoignages:', error);
        throw error;
  }
    
}