import instanceAxios from "../../_utils/axios";

export const sendContactFormData = async (formData) => {
    try {

      const response = await instanceAxios.post('/contact/submit', formData);
      if(response.data && response.data.status === "success") {

          return response.data.data
      } else {

          throw new Error("Données reçues non valides ou erreur de requête. ");
      }
    } catch (error) {

        console.error("Erreur lors de l’envoi des données du formulaire de contact", error);
        throw error
    }

}


export const fetchAllContact = async () => {
    try {

        const response = await instanceAxios.get('/contact');
        if(response.data && response.data.status === "success") {

            return response.data.data
        } else {

            throw new Error("impossible d'obtenir la liste des contacts");
        }   
    } catch (error) {

        console.error("Erreur lors de la récupération de la liste de contact", error);
        throw error
    }

}