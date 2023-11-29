import instanceAxios from '../../_utils/axios';

//Optenir tout les témoignages 
export const fetchAllTestimonies = async () => {
    try {

        const response = await instanceAxios.get('/testimonies');
        if (response.data && response.data.status === 'success') {

            return response.data.data
        } else {

            throw new Error(response.data.message || "Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {
      
        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de la récupération des témoignages:', errorMessage);

        throw new Error(errorMessage);
    }
};



// Créer un avis client
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
};


//Approuver un avis client 
export const approveTestimony = async (idTestimony, csrfToken) => {
    try {

        const requestBody = {

            idTestimony: idTestimony,
            csrfToken: csrfToken
        };

        const response = await instanceAxios.put(`/testimonies/${idTestimony}/approve`, requestBody);
        if (response.data && response.data.status === 'success') {

            return response.data;
        } else {

            throw new Error(response.data.message || "Erreur inconnue lors de l'aprobation du témoignage'.");
        } 
    } catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error("Erreur lors de l'aprobation du témoignage:", errorMessage);
    
        throw new Error(errorMessage);
    }
};

//Rejeter un avis client
export const rejectTestimony = async (idTestimony, csrfToken) => {
    try {

        const requestBody = {

            idTestimony: idTestimony,
            csrfToken: csrfToken
        };

        const response = await instanceAxios.put(`/testimonies/${idTestimony}/reject`, requestBody);
        if (response.data && response.data.status === 'success') {

            return response.data;
        } else {

            throw new Error(response.data.message || "Erreur inconnue lors du rejet du témoignage.")
        } 
    } catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors du rejet du témoignage:', errorMessage);
    
        throw new Error(errorMessage);
    }
}


//Supprimer un avis client
export const deleteTestimony = async (idTestimony, csrfToken) => {
    try {

        const url = `/testimonies/delete?idTestimony=${encodeURIComponent(idTestimony)}&csrfToken=${encodeURIComponent(csrfToken)}`;

        const response = await instanceAxios.delete(url);
        if (response.data && response.data.status === 'success') {

            return response.data;
        } else {

            throw new Error(response.data.message || "Erreur inconnue lors de la suppression du témoignage.")
        } 
    } catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de la suppression du témoignage:', errorMessage);
    
        throw new Error(errorMessage);
    }
    
};

