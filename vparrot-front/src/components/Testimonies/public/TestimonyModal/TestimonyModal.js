import React, { useState } from 'react';

import useFetchCreateTestimony from '../../hooks/useFetchCreateTestimony';
import ReCAPTCHA from 'react-google-recaptcha';
import { validateEmail, validateRating, validateComment, validateName } from '../../../../_utils/validation';

import TextInput from '../../../common/Input/TextInput/TextInput';
import SelectInput from '../../../common/Input/SelectInput/SelectInput';
import TextArea from '../../../common/Input/TextArea/TextArea';
import Button from '../../../common/Buttons/Button/Button';
import H2Title from '../../../common/H2Title/H2Title';

import TestimonyStyle from './testimonyModal.module.css';

const reCaptchaKey = "6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const TestimonyModal = ({ onClose }) => {

    const [testimonyData, setTestimonyData] = useState({
        firstName: "",
        lastName: "",
        content: "",
        rating: ""
         })

    const [ errors, setErrors] = useState({});
    const [captchaValue, setCaptchaValue] = useState(null);

    const { createNewTestimony, isLoading } = useFetchCreateTestimony();



    const closeModal = () => {
      onClose();
    };
    
    const handleInputChange = (e) => {
        const  {name, value} = e.target;
        setTestimonyData({
          ...testimonyData,
          [name]: value,
        });

        const newErrors = { ...errors };
  
        switch (name) {
          case 'lastName':
          case 'firstName':
              newErrors[name] = validateName(value)
              break;
          case 'email':
            newErrors.email = validateEmail(value);
            break;
          case 'rating':
            newErrors.rating = validateRating(value);
            break;
          case 'content':
            newErrors.content = validateComment(value);
            break;
          default:
            break;
        }

        setErrors(newErrors);     
    };

    const hasNoErrors = () => {
      return Object.values(errors).every(error => !error);
    };

    const areAllFieldsFilled = () => {
      return Object.values(testimonyData).every(value => value !== '');
    };



    const isFormReadyForSubmission = () =>{
      return hasNoErrors() && testimonyData && !isLoading && captchaValue;
    }

    const dataToSend = {
      ...testimonyData,
      recaptchaResponse: captchaValue
  };

    
    //sousmission du formulaire 
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!hasNoErrors()) {
          return;
        }
        try {
            await createNewTestimony(dataToSend);
            
        } catch (error) {

        } finally {

          closeModal();
        }
    }

    //Tableau d'option pour le chox de la note
    const ratingOptions = [
      { id: 0, value: "", label: "Choisir une note" },
      { id: 1, value: 1, label: "1" },
      { id: 2, value: 2, label: "2" },
      { id: 3, value: 3, label: "3" },
      { id: 4, value: 4, label: "4" },
      { id: 5, value: 5, label: "5" },
    ];

    return (
      <div className="modalOverlay">
          <div className={TestimonyStyle.formContainer}>
              <H2Title h2Text="Votre témoignage"/>
              <form onSubmit={handleSubmit} className={TestimonyStyle.createTestimony}>
                  <TextInput
                    label="Prénom"
                    name="firstName"
                    type="text"
                    value={testimonyData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  <TextInput
                    label="Nom"
                    name="lastName"
                    type="text"
                    value={testimonyData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                  <TextArea
                        label="Témoignage"
                        name="content"
                        value={testimonyData.content}
                        onChange={handleInputChange}
                        error={errors.content}
                    />
                  <SelectInput
                    label="Note"
                    name="rating"
                    value={testimonyData.rating}
                    onChange={handleInputChange}
                    options={ratingOptions}
                    error={errors.rating}
                  />
                  {areAllFieldsFilled() && hasNoErrors() && (
                      <ReCAPTCHA
                          sitekey={reCaptchaKey}
                          onChange={(value) => setCaptchaValue(value)}
                      />
                  )}
                  <Button
                      type="submit"
                      disabled={!isFormReadyForSubmission()}
                      colorStyle="redBtn"
                      className={TestimonyStyle.submitTestimony}
                  >
                      Créer le témoignage
                  </Button>
                  <Button
                      type="button"
                      onClick={closeModal}
                      className={TestimonyStyle.closeBtn} 
                  >
                      X
                  </Button>
              </form>
          </div>  
      </div>
    );
};

export default TestimonyModal;