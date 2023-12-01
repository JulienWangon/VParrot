import instanceAxios from "../../_utils/axios";


//Optenir la liste des utilisateurs et leur rôle
export const fetchAllUsers = async () => {

    try {

        const response = await instanceAxios.get('/users');
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data)
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


//Ajouter un nouvel utilisateur 
export const addUser = async (userData, csrfToken) => {
    try {

        const requestBody = {
            user: userData,
            csrfToken: csrfToken
        };


        const response = await instanceAxios.post('/user', requestBody);
        if (response.data && response.data.status === 'success') {

            return response.data.data;
        } else {

            throw new Error(response.data.message || "Données reçues non valides ou erreur de requête.");
        }

    } catch (error) {

        const errorMessage = error.response?.data?.message ?? "Erreur lors de la communication avec l'API.";
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', errorMessage);
        throw new Error(errorMessage);
    }



}

