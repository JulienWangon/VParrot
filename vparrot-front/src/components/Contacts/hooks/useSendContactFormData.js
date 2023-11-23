import { useState } from "react";
import { sendContactFormData } from "../contactFormService";
import { useMessage } from "../../../contexts/MessagesContext";

const useSendContactFormData = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showMessage } = useMessage();

    const handleSubmit = async (formData, recaptchaResponse) => {

        setIsSubmitting(true);
         const dataWithRecaptcha = {...formData, recaptchaResponse};

        try {

            const response = await sendContactFormData(dataWithRecaptcha);
          
            showMessage({ data: response }, 'success');
            return response;             
        } catch (error) {

            if (error.response && error.response.data) {
               
                showMessage({ data: error}, 'success');
            } else {
                
                showMessage({ data: { message: error.message || "Une erreur s'est produite" } }, 'error');
            }       
        } finally {

          setIsSubmitting(false);
         }
    };

    return { handleSubmit, isSubmitting };
};

export default useSendContactFormData;




