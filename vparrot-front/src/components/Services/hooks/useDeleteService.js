import { useState } from 'react';
import { deleteService } from '../serviceServices'; 
import { useMessage } from '../../../contexts/MessagesContext';

const useDeleteService = () => {
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState(false);

    const deleteServiceData = async (serviceId, csrfToken) => {
        setLoading(true);
        try {
            const response = await deleteService(serviceId, csrfToken);
            if (response.data && response.data.status === 'success') {
                showMessage(response, 'success');
                return { success: true };
            } else {
                showMessage(response, 'error');      
            }
        } catch (error) {
            showMessage({ data: { message: error.message || "Une erreur s'est produite lors de la suppression du service." }, type: 'error' });
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return { deleteServiceData, loading };
};

export default useDeleteService;
