import { useState } from "react";
import { deleteCar } from "../CarsService";
import { useMessage } from "../../../contexts/MessagesContext";


const useDeleteCar = () => {

    const { showMessage } = useMessage();
    const [loading, setLoading ] = useState(false);

    const deleteCarData = async ( carId, csrfToken) => {

      setLoading(true);

      try {

        const response = await deleteCar(carId, csrfToken);
        if(response.data && response.data.status === 'success') {

          showMessage({ message: 'Véhicule supprimé avec succès.', type: 'success' });
        } else {

          showMessage({ message: response.data.message, type: 'error' });
        }

      } catch (error) {

        showMessage({ message: error.message || "Une erreur s'est produite lors de la suppression du véhicule.", type: 'error' });
        return { success: false, error: error.message };
      } finally {

        setLoading(false);
      }

    };

    return { deleteCarData, loading};
}

export default useDeleteCar;