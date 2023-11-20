import instanceAxios from '../../_utils/axios';

//Obtenir la liste des services groupés par type
export const fetchAllServicesGroupedByType = async () => {

    try {

        const response = await instanceAxios.get('/services');
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