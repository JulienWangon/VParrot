import { useState } from "react";
import { sendContactFormData } from "../contactFormService";
import { useMessage } from "../../../contexts/MessagesContext";

const useSendContactFormData = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showMessage } = useMessage();

    const handleSubmit = async (formData, recaptchaToken) => {

        setIsSubmitting(true);
         const dataWithRecaptcha = {...formData, recaptchaToken};

        try {

            const response = await sendContactFormData(dataWithRecaptcha);
            showMessage(response.message, "success");             
        } catch (error) {

            showMessage(error.message, "error");         
        } finally {

          setIsSubmitting(false);
         }
    };

    return { handleSubmit, isSubmitting };
};

export default useSendContactFormData;




