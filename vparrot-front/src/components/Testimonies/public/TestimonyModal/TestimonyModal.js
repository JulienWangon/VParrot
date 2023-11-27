import React, { useState, useEffect } from 'react';

import useFetchCreateTestimony from '../../hooks/useFetchCreateTestimony';

//import de google recaptcha
import ReCAPTCHA from 'react-google-recaptcha';
//Import utilitaire pour validation des entrées utilisateur
import { validateEmail, validateRating, validateComment, validateName } from '../../../../_utils/validation';

//import des composants 
import TextInput from '../../../common/Input/TextInput/TextInput';
import SelectInput from '../../../common/Input/SelectInput/SelectInput';
import TextArea from '../../../common/Input/TextArea/TextArea';
import Button from '../../../common/Buttons/Button/Button';
import H2Title from '../../../common/H2Title/H2Title';

import TestimonyStyle from './testimonyModal.module.css';

//Clé API pour google recaptcha
const reCaptchaKey = "6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const TestimonyModal = ({ onClose, mode, testimony, approveThisTestimony, rejectThisTestimony, onTestimonyCreated }) => {

    const { createNewTestimony, loading } = useFetchCreateTestimony();

    //Etat local pour stocker les données de l'avis client
    const [testimonyData, setTestimonyData] = useState({
        firstName: "",
        lastName: "",
        content: "",
        rating: ""
         })
    
    //Etat pour stocker les erreurs de validations des champs
    const [ errors, setErrors] = useState({});

    //Etat pour la valeur du recaptcha
    const [captchaValue, setCaptchaValue] = useState(null);
    
    //Remplissage des données en mode modération
    useEffect(() => {
      if (mode === "moderation" && testimony) {
          setTestimonyData({
              firstName: testimony.firstName,
              lastName: testimony.lastName,
              content: testimony.content,
              rating: testimony.rating
          });
          
      }
    }, [mode, testimony]);

   
    //Gestion des changemetns dans les champs du formulaire
    const handleInputChange = (e) => {
        const  {name, value} = e.target;
        setTestimonyData({
          ...testimonyData,
          [name]: value,
        });

        //Validations des entrées de champs en fonction des régles de validation
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

    //Vérification de l'absence d'erreurs
    const hasNoErrors = () => {
      return Object.values(errors).every(error => !error);
    };

    //Vérifie si tout les champs sont rempli
    const areAllFieldsFilled = () => {
      return Object.values(testimonyData).every(value => value !== '');
    };

    //Varification si le formulaire est pret a etre envoyer
    const isFormReadyForSubmission = () =>{
      return hasNoErrors() && testimonyData &&  captchaValue;
    }

    //Gestion de l approbation d'un avis client
    const handleApprove = async () => {
      if (mode === "moderation") {
          await approveThisTestimony(testimony.idTestimony);
          onClose();
      }
    };

    const handleReject = async () => {
      if (mode === "moderation") {
          await rejectThisTestimony(testimony.idTestimony);
          onClose();
      }
    };

    //soumission du formulaire dans le cas de la création d'un avis client
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (mode === "creation" && areAllFieldsFilled() && hasNoErrors()) {
          const dataToSend = { ...testimonyData, recaptchaResponse: captchaValue };
          const response = await createNewTestimony(dataToSend);
          if (response && response.status === 'success') {
            onTestimonyCreated(response.data);
            onClose();
        }   
      }
  };

    //Tableau d'option pour le choix de la note
    const ratingOptions = [
      { id: 0, value: "", label: "Choisir une note" },
      { id: 1, value: 1, label: "1" },
      { id: 2, value: 2, label: "2" },
      { id: 3, value: 3, label: "3" },
      { id: 4, value: 4, label: "4" },
      { id: 5, value: 5, label: "5" },
    ];


    if(loading) return <div>Chargement...</div>

    return (

      <div className={TestimonyStyle.modalOverlay}>
          <div className={TestimonyStyle.formContainer}>
              <H2Title h2Text={mode === "creation" ? "Votre témoignage" : "Modération du témoignage"} className={TestimonyStyle.testimonyTitle} colorStyle="whiteTitle"/>
              <form onSubmit={handleSubmit} className={TestimonyStyle.createTestimony}>
                  <TextInput
                    formGroupClass={TestimonyStyle.formGroup}
                    inputClassName={TestimonyStyle.testimonyInput}
                    label="Prénom"
                    name="firstName"
                    type="text"
                    value={testimonyData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  <TextInput
                    formGroupClass={TestimonyStyle.formGroup}
                    inputClassName={TestimonyStyle.testimonyInput}
                    label="Nom"
                    name="lastName"
                    type="text"
                    value={testimonyData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                  <TextArea
                      formGroupClass={TestimonyStyle.formGroup}
                      inputClassName={TestimonyStyle.testimonyInput}
                      label="Votre avis"
                      name="content"
                      value={testimonyData.content}
                      onChange={handleInputChange}
                      error={errors.content}
                    />
                  <SelectInput
                      formGroupClass={TestimonyStyle.formGroup}
                      inputClassName={TestimonyStyle.testimonyInput}
                      label="Note"
                      name="rating"
                      value={testimonyData.rating}
                      onChange={handleInputChange}
                      options={ratingOptions}
                      error={errors.rating}
                  />
                  {mode === "creation" && areAllFieldsFilled() && hasNoErrors() && (
                      <ReCAPTCHA
                          sitekey={reCaptchaKey}
                          onChange={(value) => setCaptchaValue(value)}
                      />
                  )}
                   {mode === "creation" && (
                        <Button className={TestimonyStyle.createTestimonyBtn} disabled={!isFormReadyForSubmission()} onClick={handleSubmit} colorStyle="whiteBtn" >Créer le témoignage</Button>
                    )}
                    {mode === "moderation" && (
                        <>
                            <Button onClick={handleApprove}>Approuver</Button>
                            <Button onClick={handleReject}>Rejeter</Button>
                        </>
                    )}
                    <Button
                        type="button"
                        onClick={onClose}
                        className={TestimonyStyle.closeBtn}
                        colorStyle="redBtn"
                    >
                        X
                    </Button>
              </form>
          </div>  
      </div>
    );
};

export default TestimonyModal;