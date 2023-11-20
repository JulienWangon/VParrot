import instanceAxios from "../../_utils/axios";

//Obtenir la liste des horaires d'ouverture
export const fetchAllSchedules = async () => {
    try {

        const response = await instanceAxios.get('/schedules');
        if (response.data && response.data.status === 'success') {

          return response.data.data;
      } else {

          throw new Error(response.data.message || "Données reçues non valides ou erreur de requête.");
      }
    } catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de la récupération de la liste des horaires:', errorMessage);

        throw new Error(errorMessage);
    }

};


//Mise à jour des horaires d'ouverture
export const fetchUpdateSchedules = async (idOpeningDay, scheduleData, csrfToken) => {
    try {

        const requestBody = {
            ...scheduleData,
            csrfToken: csrfToken
        }

      
        const response = await instanceAxios.put(`/schedules/${idOpeningDay}/update`, requestBody)
        if (response.data && response.data.status === 'success') {

          return response.data.data;
        } else {

          throw new Error(response.data.message || "Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de la suppression du témoignage:', errorMessage);
    
        throw new Error(errorMessage);
    }
}