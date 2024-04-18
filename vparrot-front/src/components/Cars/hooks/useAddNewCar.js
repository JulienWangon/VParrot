import { useState } from "react";
import { addNewCar } from "../CarsService";
import { useMessage } from "../../../contexts/MessagesContext";


const useAddNewCar = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [ error, setError] = useState(null);

  const createCar = async (formData, csrfToken) => {
      setLoading(true);
      setError(null);

      try {
          const response = await addNewCar(formData, csrfToken);
       
          if (response && response.status === 'success') {
           
              showMessage({ data: { message: response.data.message } }, 'success');
              
              return response; 
          } else {
              const error = new Error(response.message || "Erreur lors de la création du véhicule.");
              setError(error.message);
              throw error;
          }
      } catch (error) {
       
          setError(error.message || "Une erreur s'est produite lors de la création du véhicule.");
          showMessage({ data: { message: error.message || "Une erreur s'est produite lors de la création du véhicule." } }, 'error');
       
      } finally {
          setLoading(false); 
      }
  };

  return { createCar, loading, error };
}

export default useAddNewCar;