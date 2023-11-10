import instanceAxios from '../../_utils/axios';


// Get cars brief details
export const fetchCarsBriefDetails = async () => {
    try {

        const response = await instanceAxios.get('/cars/briefs');
        if (response.data && response.data.status === 'success') {

          return response.data.data;
        } else {

            throw new Error("Données reçues non valides ou erreur de requête.");
        }
    } catch (error) {

        console.error('Erreur lors de la récupération des détails des véhicules:', error);
        throw error;
  }

};

//Get distinct brand
export const fetchDistinctBrands = await 