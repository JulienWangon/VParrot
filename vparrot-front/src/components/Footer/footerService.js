import axios from 'axios';

//Get all Schedules 
export const fetchSchedules = async () => {
    
    try {

        const response = await axios.get('http://localhost/vparrot/schedules');
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