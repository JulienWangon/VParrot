import React, { useState, useEffect } from "react";

import useSendContactFormData from "../hooks/useSendContactFormData";
import { validateName, validateEmail, validateComment, validatePhoneNumber, validateStringWithNumber } from "../../../_utils/validation";

import ReCAPTCHA from "react-google-recaptcha";
import TextInput from '../../common/Input/TextInput/TextInput';
import TextArea from '../../common/Input/TextArea/TextArea';
import ContactBtn from '../../common/Buttons/ContactBtn/ContactBtn';

import './contactForm.css';

const reCaptchaKey ="6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const ContactForm = ({ subject }) => {

    const [formData, setFormData] = useState({ 
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        subject: subject || "",
        message: "",
    });

    useEffect(() => {
        setFormData(currentFormData => ({ ...currentFormData, subject }));
    }, [subject]);
    
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [recaptchaError, setRecaptchaError] = useState("");
    const [allFieldsValid, setAllFieldsValid] = useState(false);

    const { handleSubmit, isSubmitting } = useSendContactFormData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
        checkAllFieldsValid();
    };


    const validateField = (name, value) => {
      let error = "";
      switch (name) {
          case "lastName":
          case "firstName":
              error = validateName(value);
              break;
          case "email":
              error = validateEmail(value);
              break;
          case "phone":
              error = validatePhoneNumber(value);
              break;
          case "subject":
              error = validateStringWithNumber(value);
              break;
          case "message":
              error = validateComment(value);
              break;
          default:
              break;
      }
      setFieldErrors({ ...fieldErrors, [name]: error });
    };

    const checkAllFieldsValid = () => {
      let isValid = true;
      for (const [key, value] of Object.entries(formData)) {
          const error = validateField(key, value);
          if (error) {
              isValid = false;
              break; 
          }
      }
      setAllFieldsValid(isValid);
  };

    
    const onFormSubmit = async (e) => {
      e.preventDefault();
      setRecaptchaError("");

      if (!recaptchaToken) {

        setRecaptchaError("Veuillez compléter le CAPTCHA.");
        return;
      }

      if (!validateForm()) return;
      await handleSubmit(formData, recaptchaToken);
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
      setAllFieldsValid(isValid); // Déplacer cette ligne ici
      return isValid;
  };


    return (

        <form className="contactForm" onSubmit={onFormSubmit}>

            <TextInput
                inputClassName="inputContactForm"
                label="Nom"
                placeholder="Votre nom"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                error={fieldErrors.lastName}                               
            />

            <TextInput
                inputClassName="inputContactForm"
                label="Prénom"
                placeholder="Votre prénom"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                error={fieldErrors.firstName}
            />

            <TextInput
                inputClassName="inputContactForm"
                label="Email"
                placeholder="Votre email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
            />

            <TextInput
                inputClassName="inputContactForm"
                label="Téléphone"
                placeholder="Votre numéro de téléphone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                error={fieldErrors.phone}
            />

            <TextInput
                inputClassName="inputContactForm"
                label="Sujet"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
            />

            <TextArea
                inputClassName="inputContactForm"
                label="Message"
                placeholder="Votre message"
                name="Message"
                value={formData.message}
                onChange={handleChange}
                error={fieldErrors.message}
            />

            {allFieldsValid && (
                <ReCAPTCHA
                    sitekey={reCaptchaKey}
                    onChange={handleRecaptchaChange}
                />
            )}
            {recaptchaError && <div className="error-message">{recaptchaError}</div>}

            <ContactBtn
                className="submitContactForm"
                type="submit"
                disabled={isSubmitting}
            >
                Envoyer
            </ContactBtn>

        </form>
    );
}

export default ContactForm