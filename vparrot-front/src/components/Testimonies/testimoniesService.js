import axios from 'axios';

// Get all moderated Testimonies
export const fetchModeratedTestimonies = async () => {
    try {

        const response = await axios.get('http://localhost/vparrot/testimonies/moderated');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {
      
        console.error('Erreur lors de la récupération des témoignages:', error);
        throw error;
    }
};