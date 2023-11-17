import React, { useState } from 'react';
import  useRequestPasswordReset from '../hook/useRequestPasswordReset';
import { useMessage } from '../../../contexts/MessagesContext';

import ReCAPTCHA from "react-google-recaptcha";
import { validateEmail } from '../../../_utils/validation';

const reCaptchaKey ="6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const { showMessage } = useMessage();

  const { resetPasswordRequest } = useRequestPasswordReset(); 


  const handleChange = (e) => {
    setEmail(e.target.value);
    const validationError = validateEmail(e.target.value);
    setEmailError(validationError); 
    setIsEmailValid(validationError === null);
};


  const handleCaptchaChange = (value) => {

    setCaptchaValue(value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CAPTCHA Value at submit:", captchaValue);
    
    if (!isEmailValid || !captchaValue) {
      showMessage({ data: { message: 'Veuillez compléter correctement le formulaire et résoudre le CAPTCHA.' } }, 'error');
      return;
    }

    try {
      const response = await resetPasswordRequest(email, captchaValue);
      if (response) {

          const formattedResponse = { data: { message: response } };
          showMessage(formattedResponse, 'success');      
      }
    } catch (error) {
  
      const errorResponse = { data: { message: 'Une erreur s\'est produite lors de la demande de réinitialisation de mot de passe.' } };
      showMessage(errorResponse, 'error');
    }
  };

  return (
    <div>
      <h2>Demande de réinitialisation de mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleChange} />
        </label>
        {emailError && <div>{emailError}</div>}

        {isEmailValid && ( 
          <ReCAPTCHA
            sitekey={reCaptchaKey}
            onChange={handleCaptchaChange}
          />
        )}

        <button type="submit" disabled={!captchaValue}>Envoyer</button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;


