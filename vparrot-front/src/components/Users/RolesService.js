import instanceAxios from "../../_utils/axios";


//Optenir la liste des roles 
export const fetchAllRoles = async () => {
    try {

        const response = await instanceAxios.get('/roles');
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
}