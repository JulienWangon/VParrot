import instanceAxios from '../../_utils/axios';

//Obtenir la liste des services groupés par type
export const fetchAllServicesGroupedByType = async () => {

    try {

        const response = await instanceAxios.get('/services');
        if (response.data && response.data.status === 'success') {
          
            return response.data.data;
        } else {

           return response.data.message;
        }
    } catch (error) {
    
        console.error('Erreur lors de la récupération des témoignages:', error);
        throw error;
  }
    
}

//Liste des types de service
export const fetchAllServiceTypes = async () => {
    try {
        const response = await instanceAxios.get('/types');
        if (response.data && response.data.status === 'success') {
            // Retourne un objet avec un indicateur de succès et les données
            return { success: true, data: response.data.data };
        } else {
            // Retourne un objet avec un indicateur d'échec et le message d'erreur
            return { success: false, error: response.data.message || 'Erreur inattendue lors de la récupération des données' };
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des types de service: ', error);
        // Il est également judicieux de retourner un objet en cas d'erreur dans le bloc catch
        return { success: false, error: error.message || 'Erreur lors de la communication avec l\'API' };
    }
}

//Création nouveau service
export const addNewService = async (formData, csrfToken) => {
    try {
        // Remplacez '/Instrumental/add' par votre endpoint pour l'ajout d'un service
        const response = await instanceAxios.post('/service/add', formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken, // Assurez-vous que votre backend est configuré pour utiliser ce token CSRF
            },
            'Content-Type': undefined, // Cela permet à Axios de définir automatiquement le Content-Type à multipart/form-data avec le boundary correct
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un nouveau service:', error);
        throw error;
    }
};

//Mise à jour d'un service
export const updateService = async (serviceId, formData, csrfToken) => {
    try {

        const response = await instanceAxios.post(`/service/${serviceId}/update`, formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken, 
            },
            'Content-Type': undefined,
        });

        if (response.data && response.data.status === 'success') {
            // Retourner directement la réponse pour une utilisation facile avec showMessage
            return { data: response.data, type: 'success' };
        } else {
            // Gérer le cas où la mise à jour n'est pas un succès
            return { data: response.data, type: 'error' };
        }

    } catch (error) {
        console.error(`Erreur lors de la mise à jour du service ${serviceId}:`, error);
        // Retourner un objet d'erreur compatible avec showMessage
        return { data: { message: error.message || 'Erreur lors de la communication avec l\'API' }, type: 'error' };
    }

};

//Supprimer un service 
export const deleteService = async (serviceId, csrfToken) => {
    try {
        const response = await instanceAxios.delete(`/service/${serviceId}/delete`, {
            headers: {'X-CSRF-TOKEN': csrfToken}
        });

        if (response.data && response.data.status === 'success') {
           
            return { data: response.data, type: 'success' };
        } else {
           
            return { data: response.data, type: 'error' || 'Échec de la suppression du service' };
        }

    } catch ( error) {
        console.error(`Erreur lors de la suppression du service ${serviceId}:`, error);
        return { data: error.data, type: 'success' || 'Erreur lors de la communication avec l\'API' };
    }
}