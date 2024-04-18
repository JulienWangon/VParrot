import instanceAxios from "../../_utils/axios";

export const sendContactFormData = async (formData) => {
    try {

      const response = await instanceAxios.post('/contact', formData);
      if(response.data && response.data.status === "success") {

          return response.data
      } else {

        throw response.data;
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

            throw response.data;
        }   
    } catch (error) {

        console.error("Erreur lors de la récupération de la liste de contact", error);
        throw error
    }

}


export const fetchAllTreatedContact = async () => {
    try {

        const response = await instanceAxios.get('/contact/treated');
        if(response.data && response.data.status === "success") {

            return response.data.data;
        } else {

            throw response.data;
        }
    } catch (error) {

        console.error("Erreur lors de la récupération de la liste des contacts traités", error);
        throw error;
    }
}


export const treatContact = async (contactData, csrfToken) => {

    try {

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        } 

      
        const response = await instanceAxios.post('/contact/treat', contactData, { headers });

        if(response.data && response.data.status === "success") {

            return response.data;
        } else {

            throw response.data;
        }
        
    } catch (error) {

        console.error("Erreur lors du traitement du contact", error);
        throw error;
    }
}