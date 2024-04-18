import { useState } from 'react';
import { updateService } from "../serviceServices"; // Assurez-vous que le chemin vers votre service est correct
import { useMessage } from '../../../contexts/MessagesContext';


const useUpdateService = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const updateServiceData = async (serviceId, formData, csrfToken) => {
      setLoading(true);

      try {
          const response = await updateService(serviceId, formData, csrfToken);
        console.log(response);
          if (response.data && response.data.status === 'success') {
            showMessage(response, 'success');
              return { success: true };
          } else {
              throw new Error(response.data.message || "Erreur lors de la mise à jour du service.");
          }
      } catch (error) {
          showMessage({ data: { message: error.message || "Une erreur s'est produite lors de la mise à jour du service." }, type: 'error'});
          return { success: false, error: error.message };
      } finally {
          setLoading(false);
      }
  };

  return { updateServiceData, loading };
}


export default useUpdateService;
