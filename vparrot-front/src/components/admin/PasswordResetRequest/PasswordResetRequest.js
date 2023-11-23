import React, { useState } from 'react';
import  useRequestPasswordReset from '../hook/useRequestPasswordReset';
import { useMessage } from '../../../contexts/MessagesContext';
import ReCAPTCHA from "react-google-recaptcha";
import { validateEmail } from '../../../_utils/validation';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Buttons/Button/Button';

import requestStyle from './passwordResetRequest.module.css';
import TextInput from '../../common/Input/TextInput/TextInput';

const reCaptchaKey ="6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const { showMessage } = useMessage();
  const navigate = useNavigate();
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
          navigate("/access-panel");
              
      }
    } catch (error) {
  
      const errorResponse = { data: { message: 'Une erreur s\'est produite lors de la demande de réinitialisation de mot de passe.' } };
      showMessage(errorResponse, 'error');
    }
  };

  return (
    <div className={requestStyle.pageContainer}>
      <div className="opacityLayer"></div>
    <div className={requestStyle.container}>
      <h2 className="whiteTitle">Demande de réinitialisation de mot de passe</h2>
      <form className={requestStyle.requestForm} onSubmit={handleSubmit}>
      
        <TextInput formGroupClass={requestStyle.formGroup} type="email" label="Email" name="email" value={email} onChange={handleChange} />
        
        {emailError && <div>{emailError}</div>}

        {isEmailValid && ( 
          <ReCAPTCHA
            sitekey={reCaptchaKey}
            onChange={handleCaptchaChange}
          />
        )}

        <Button className={requestStyle.submitRequest}colorStyle="redBtn" type="submit" disabled={!captchaValue}>Envoyer</Button>
      </form>
    </div>
    </div>
  );
};

export default PasswordResetRequest;


