import React, { useState, useEffect } from "react";

import useSendContactFormData from "../hooks/useSendContactFormData";
import { validateName, validateEmail, validateComment, validatePhoneNumber, validateStringWithNumber } from "../../../_utils/validation";
import { useContactModal } from "../../../contexts/ContactModalContext";
import ReCAPTCHA from "react-google-recaptcha";
import TextInput from '../../common/Input/TextInput/TextInput';
import TextArea from '../../common/Input/TextArea/TextArea';


import contactStyle from './contactForm.module.css';
import Button from "../../common/Buttons/Button/Button";

const reCaptchaKey ="6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const ContactForm = ({ subject }) => {

    const { closeContactModal, modalData } = useContactModal();

    const [formData, setFormData] = useState({ 
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        subject: subject || "",
        content: "",
    });

    useEffect(() => {
        if (modalData && modalData.subject) {
            setFormData(currentFormData => ({ ...currentFormData, subject: modalData.subject }));
        }
    }, [modalData]);
    
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [recaptchaError, setRecaptchaError] = useState("");
    const [allFieldsValid, setAllFieldsValid] = useState(false);

    const { handleSubmit, isSubmitting } = useSendContactFormData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        
        const error = validateField(name, value);
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        checkAllFieldsValid();
    };


    const validateField = (name, value) => {
        switch (name) {
            case "lastName":
            case "firstName":
                return validateName(value);
            case "email":
                return validateEmail(value);
            case "phone":
                return validatePhoneNumber(value);
            case "subject":
                return validateStringWithNumber(value);
            case "content":
                return validateComment(value);
            default:
                return "";
        }
    };

    const checkAllFieldsValid = () => {
        let isValid = true;
        for (const [key, value] of Object.entries(formData)) {
            if (validateField(key, value)) {
                isValid = false;
                break;
            }
        }
        setAllFieldsValid(isValid);
    };

    
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await handleSubmit(formData, recaptchaToken);
            closeContactModal();
        } else {
            console.log("Validation échouée");
        }
    };


    const handleRecaptchaChange = (value) => {
      setRecaptchaToken(value);
      setRecaptchaError("");
    };

  
    const validateForm = () => {
        let isValid = true;
        const newFieldErrors = {};
        for (const key in formData) {
            const error = validateField(key, formData[key]);
            newFieldErrors[key] = error;
            if (error) isValid = false;
        }
        setFieldErrors(newFieldErrors);
        return isValid;
    };


    return (

        <div className={contactStyle.modalOverlay}>
            
            <form className={contactStyle.inputContainer} onSubmit={onFormSubmit}>
            <h5 className={contactStyle.contactTitle}>Contact</h5>
                <TextInput
                    inputClassName={contactStyle.ContactForm}
                    formGroupClass={contactStyle.formGroup}
                    label="Nom"
                    placeholder="Votre nom"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={fieldErrors.lastName}                               
                />

                <TextInput
                    inputClassName={contactStyle.ContactForm}
                    formGroupClass={contactStyle.formGroup}
                    label="Prénom"
                    placeholder="Votre prénom"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={fieldErrors.firstName}
                />

                <TextInput
                    inputClassName={contactStyle.ContactForm}
                    formGroupClass={contactStyle.formGroup}
                    label="Email"
                    placeholder="Votre email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={fieldErrors.email}
                />

                <TextInput
                    inputClassName={contactStyle.ContactForm}
                    formGroupClass={contactStyle.formGroup}
                    label="Téléphone"
                    placeholder="Votre numéro de téléphone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    error={fieldErrors.phone}
                />

                <TextInput
                    inputClassName={contactStyle.ContactForm}
                    formGroupClass={contactStyle.formGroup}
                    label="Sujet"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    error={fieldErrors.subject}
                />

                <TextArea
                    inputClassName={contactStyle.ContactForm}
                    formGroupClass={contactStyle.formGroup}
                    label="Message"
                    placeholder="Votre message"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    error={fieldErrors.content}
                />

                {allFieldsValid && (
                    <ReCAPTCHA
                        sitekey={reCaptchaKey}
                        onChange={handleRecaptchaChange}
                    />
                )}
                {recaptchaError && <div className="error-message">{recaptchaError}</div>}
                
                <div className={contactStyle.btnContainer}>
                    <Button type="submit" className={contactStyle.whiteContactBtn} colorStyle="whiteBtn" disabled={isSubmitting}>Envoyer</Button>
                    <Button className={contactStyle.whiteContactBtn} colorStyle="whiteBtn" onClick={closeContactModal}>Fermer</Button>
                </div>

            </form>
        </div>
    );
}

export default ContactForm