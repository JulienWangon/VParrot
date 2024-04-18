import instanceAxios from '../../_utils/axios';


// Get cars brief details
export const fetchCarsBriefDetails = async () => {
    try {

        const response = await instanceAxios.get('/cars/briefs');
        if (response.data && response.data.status === 'success') {

          return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête. ");
        }
    } catch (error) {

        console.error('Erreur lors de la récupération des détails des véhicules: ', error);
        throw error;
  }

};

export const fetchAllCarDetailsById = async (carId) => {
    try {

        const response = await instanceAxios.get(`/cars/details/${carId}`);
        if (response.data && response.data.status === 'success') {

            return response.data.data;
          } else {
  
              throw new Error("Données reçues non valides ou erreur de requête. ");
          }

    } catch (error) {

        console.error('Erreur lors de la récupération des informations de la voiture: ', error)
        throw error;
    }
}

export const fetchFilteredCars = async (filters) => { 
    try {

        const response = await instanceAxios.get('/cars/filtered', { params: filters });
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête. ");
        }       
    } catch (error) {

        console.error('Erreur lors du filtrage des voitures:', error);
        throw error;
    }
};

//Get distinct brand
export const fetchDistinctBrands = async () => {
    try {

        const response = await instanceAxios.get('/cars/distinct-brands');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête. ");
        }
    } catch (error) {

        console.error('Erreur lors de la récupération des marques distinctes: ', error);
        throw error;
    }
};

//Get distinct model
export const fetchDistinctModels = async () => {
    try {

        const response = await instanceAxios.get('/cars/distinct-models');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {

        console.error('Erreur lors de la récupération des modèle distincts: ', error);
        throw error;
    }
};

//Get distinct fuel types
export const fetchDistinctFuelTypes = async () => {
    try {

        const response = await instanceAxios.get('/cars/distinct-fuel-types');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {

        console.error('Erreur lors de la récupération des types de carburants distincts: ', error);
        throw error;
    }
};

//Get distinct transmission types
export const fetchDistinctTransmissionTypes = async () => {
    try {

        const response = await instanceAxios.get('/cars/distinct-transmission-types');
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête. ");
        }
    } catch (error) {

        console.error('Erreur lors de la récupération des types de transmissions distinctes: ', error);
        throw error;
    }
}

//Ajout d'une nouvelle voiture 
export const addNewCar = async (formData, csrfToken) => {
    try {
       
        const response = await instanceAxios.post('/car/add', formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken, 
            },
            'Content-Type': undefined, 
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'une nouvelle voiture:', error);
        throw error;
    }
};


//Récuperer la liste des equipement par type 
export const fetchAllEquipmentByType = async () => {
    try {
        const response = await instanceAxios.get('/equipments');
        if (response.data && response.data.status === 'success') {
            return response.data.data;
        } else {
            throw new Error("Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des équipements:', error);
        throw error;
    }
};

export const fetchAdminCarDetails = async () => {
    try {
        const response = await instanceAxios.get('/cars/admin-tab');
        if( response.data && response.data.status === 'success') {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Échec de l'opération.");
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails des véhicules:', error.message || "Erreur inconnue");
        throw error
    }
}

export const deleteCar  = async (carId, csrfToken) => {
    try {
        const response = await instanceAxios.delete(`/car/${carId}/delete`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken, 
            }
        })

        if(response.data && response.data.status === 'success') {
            return response.data.message
        } else {
            throw new Error(response.data.message || "Échec de la suppression du véhicule." );
        }

    } catch (error) {
        console.error('Erreur lors de la suppression du véhicule:', error.message || "Erreur inconnue");
        throw error;
    }
}

export const addEquipment = async (equipmentData, csrfToken) => {
    try {

        const response = await instanceAxios.post('/equipment/add', equipmentData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json'
            }
        });

        return response.data;

    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'équipement:', error.message || "Erreur inconnue");
        return {
            status: 'error', 
            message: error.response?.data?.message || "Erreur de réseau ou du serveur"
        };
}

}