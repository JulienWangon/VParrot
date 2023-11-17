import { useState} from 'react';
import { createTestimony } from '../testimoniesService';
import { useMessage } from '../../../contexts/MessagesContext';

const useFetchCreateTestimony = () => {

    const { showMessage } = useMessage();
    const [isloading, setIsLoading] = useState(false);
    
    const createNewTestimony = async (testimonyData) => {

        setIsLoading(true);

        try {

            const response = await createTestimony(testimonyData);
            showMessage({ data: { message: response.message } }, 'success');
            return response;

        } catch (error) {

          showMessage({ data: { message: error.message } }, 'error');
          throw error;

        } finally {

            setIsLoading(false);
        }
    };

    return { createNewTestimony, isloading};
}

export default useFetchCreateTestimony;