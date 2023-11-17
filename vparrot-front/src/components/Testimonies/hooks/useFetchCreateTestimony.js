import { useState} from 'react';
import { createTestimony } from '../testimoniesService';
import { useMessage } from '../../../contexts/MessagesContext';

const useFetchCreateTestimony = () => {

    const { showMessage } = useMessage();
    const [isloading, setIsLoading] = useState(false);
    
    const createNewTestimony = async (dataToSend) => {

        setIsLoading(true);

        try {

            const response = await createTestimony(dataToSend);
          
         


            showMessage({ data: response }, 'success');
            return response;

        } catch (error) {
        
            showMessage({ data: error.response }, 'error');
          throw error;

        } finally {

            setIsLoading(false);
        }
    };

    return { createNewTestimony, isloading};
}

export default useFetchCreateTestimony;