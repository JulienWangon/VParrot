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