import { useState } from 'react';
import { treatContact } from '../contactFormService';
import { useMessage } from '../../../contexts/MessagesContext';
import { useAuth} from '../../../contexts/AuthContext';

const useTreatContact = () => {

    const { showMessage } = useMessage();
    const { csrfToken } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const treatThisContact = async (contactData) => {

        setIsLoading(true);

        try {

          const response = await treatContact(contactData, csrfToken );
       
          if (response && response.status === 'success') {
          
            showMessage({ data: response }, 'success');          
          } else {

              throw new Error(response.data.message || "Erreur lors du traitement du contact.");
          }
        } catch (error) {

            if (error.response && error.response.data) {
                
              showMessage({ data: error}, 'error');
            } else {
              
              showMessage({ data: { message: error.message || "Une erreur s'est produite" } }, 'error');
            }       
            throw error;

        } finally {

            setIsLoading(false);
        }
    };

    return { treatThisContact, isLoading };
}

export default useTreatContact;