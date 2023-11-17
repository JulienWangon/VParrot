import instanceAxios from '../../_utils/axios';

//Optenir tout les témoignages 
export const fetchModeratedTestimonies = async () => {
    try {

        const response = await instanceAxios.get('/testimonies/moderated');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error(response.data.message || "Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {
      
        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de la récupération des témoignages:', errorMessage);

        throw new Error(errorMessage);
    }
};



// Create testimony
export const createTestimony = async (dataToSend) => {
    try {

        const response = await instanceAxios.post('/testimonies', dataToSend);

        if (response.data && response.data.status === 'success') {

            return response.data;
        } else {

            throw new Error(response.data.message || "Erreur inconnue lors de la création du témoignage.")
        } 


    }catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de la création du témoignage:', errorMessage);
    
        throw new Error(errorMessage);
    }
}