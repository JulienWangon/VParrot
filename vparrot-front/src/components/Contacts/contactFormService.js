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

        console.error("Erreur lors de l’envoi des données du formulaire de contact:', error");
        throw error
    }

}