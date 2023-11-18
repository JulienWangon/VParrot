import { useState } from 'react';
import { approveTestimony } from '../testimoniesService';
import { useMessage } from '../../../contexts/MessagesContext';

const useFetchApproveTestimony = () => {

    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const approveThisTestimony = async (idTestimony) => {

        setIsLoading(true);

        try {

            const response = await approveTestimony(idTestimony);

            showMessage({ data: response }, 'success');
            return response;
        } catch (error) {

            showMessage({ data: error.response }, 'error');
            throw error;

        } finally {

            setIsLoading(false);
        }
    };

    return { approveThisTestimony, isLoading };
}

export default useFetchApproveTestimony;