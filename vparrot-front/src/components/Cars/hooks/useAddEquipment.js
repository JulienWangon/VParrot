import { useState } from "react";
import { addEquipment } from "../CarsService";
import { useMessage } from "../../../contexts/MessagesContext";

const useAddEquipment = () => {
  
    const { showMessage} = useMessage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createEquipment = async (equipmentData, csrfToken) => {
      setLoading(true);

      try { 
        const response = await addEquipment(equipmentData, csrfToken);

        if (response && response.status === 'success') {
          showMessage({ data: { message: response.message } }, 'success');
          return response;

        } else if (response.status ==='error') {
          showMessage({ data: response }, 'error');
          setError(response);
        }

      } catch (error) {

          setError(error.message || "Une erreur s'est produite lors de l'ajout de l'équipement.");
      } finally {
          setLoading(false);
          setError(null);
      }
    };

    return { createEquipment, loading, error};
}

export default useAddEquipment;