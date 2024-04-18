import { useState } from 'react';
import { addNewService } from "../serviceServices";
import { useMessage } from '../../../contexts/MessagesContext';


const useCreateService = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const createService = async (formData, csrfToken) => {
      setLoading(true);

      try {
          const response = await addNewService(formData, csrfToken);
       
          if (response && response.status === 'success') {
              // Afficher un message de succès
              showMessage({ data: { message: 'Service créé avec succès !' } }, 'success');
              
              return response; // Renvoie les données de réponse en cas de succès
          } else {
              // Gère les réponses d'erreur du serveur
              throw new Error(response.message || "Erreur lors de la création du service.");
          }
      } catch (error) {
          // Gère les erreurs de la requête
          showMessage({ data: { message: error.message || "Une erreur s'est produite lors de la création du service." } }, 'error');
          throw error; // Propage l'erreur pour une éventuelle gestion supplémentaire
      } finally {
          setLoading(false); // Désactive l'indicateur de chargement
      }
  };

  return { createService, loading };
}

export default useCreateService;