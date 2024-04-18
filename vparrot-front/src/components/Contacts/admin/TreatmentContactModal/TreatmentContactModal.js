import React, { useState } from 'react';
import useFetchAllUsers from '../../../Users/hooks/useFetchAllUsers';
import H3Title from '../../../common/H3Title/H3Title';
import TextInput from '../../../common/Input/TextInput/TextInput';
import TextArea from '../../../common/Input/TextArea/TextArea';
import SelectInput from '../../../common/Input/SelectInput/SelectInput';
import Button from '../../../common/Buttons/Button/Button';

import treatmentModalStyle from './treatmentContactModal.module.css';
import useTreatContact from '../../hooks/useTreatContact';
import { validateComment, validateDateFormat, validateName, validateId } from '../../../../_utils/validation';


const TreatmentContactModal = ({ onClose, contact }) => {

    const { users, isLoading} = useFetchAllUsers();
    const { treatThisContact, isLoading: isTreatmentLoading } = useTreatContact();

  

    const [treatmentData, setTreatmentData] = useState({

        contactId: contact.idContact,
        assignedUserId: "",
        userComment: "",
        treatmentDate: "",
        status: ""
    })

    //Etat pour stocker les erreurs de validations des champs
    const [ errors, setErrors] = useState({});

    const statusOptions = [
      { id: 'default', value: '', label: 'Sélectionnez un statut' },
      { id: 'enCours', value: 'en cours', label: 'En Cours' },
      { id: 'traite', value: 'traite', label: 'Traité' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "assignedUserId") {
            setTreatmentData(prevData => ({
                ...prevData,
                assignedUserId: value
            }));
        }
    

        setTreatmentData(prevData => ({
            ...prevData,
            [name]: value
        }));


        //Validations des entrées de champs en fonction des régles de validation
        const newErrors = { ...errors };

        switch (name) {

            case 'userComment':
                newErrors.userComment = validateComment(value);
                break;
            case 'treatmentDate':
                newErrors.treatmentDate = validateDateFormat(value);
                break;
            case 'status':
                newErrors.status = validateName(value);
                break;
            case 'assignedUserId':
            case 'contactId':
                newErrors.assignedUserId = validateId(value);
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

   
      //Vérifie si tout les champs sont rempli
      const areAllFieldsFilled = () => {
        const allFilled = Object.values(treatmentData).every(value => value !== '');
        console.log("areAllFieldsFilled:", allFilled);
        return allFilled;
    };

     //Vérification de l'absence d'erreurs
     const hasNoErrors = () => {
        const noErrors = Object.values(errors).every(error => !error);
        console.log("hasNoErrors:", noErrors);
        return noErrors;
    };
  
      //Varification si le formulaire est pret a etre envoyer
      const isFormReadyForSubmission = () =>{
        return hasNoErrors() && treatmentData;
      }

    


 
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("handleSubmit called", treatmentData);
      if (areAllFieldsFilled() && hasNoErrors()) {
        console.log("Formulaire prêt pour la soumission");

      

            try {
                console.log("Avant appel de treatThisContact");
                await treatThisContact(treatmentData);
                console.log("Après appel de treatThisContact");
                onClose();
            } catch (error) {
                console.error('Erreur lors du traitement du contact:', error);
            }
      } else {
        console.log("Le formulaire n'est pas prêt pour la soumission");
      }
    };

    return (
      <div className={treatmentModalStyle.modalOverlay}> 
          <div className={treatmentModalStyle.inputContainer}> 
              <H3Title className={treatmentModalStyle.treatmentTitle} h3Text="Traitement du contact"/>  
              <form className={treatmentModalStyle.treatmentForm} onSubmit={handleSubmit}>     
              <SelectInput
    inputClassName={treatmentModalStyle.treatmentInput}
    formGroupClass={treatmentModalStyle.formGroup}
    label="Utilisateur"
    name="assignedUserId"
    value={treatmentData.assignedUserId}
    onChange={handleInputChange}
    options={[
        { idUser: null, value: "", label: "Sélectionnez un utilisateur" },
        ...users.map(user => ({
            key: user.idUser, 
            value: user.idUser,   
            label: `${user.lastName} ${user.firstName}`
        }))
    ]}
/>

                  <TextArea
                      inputClassName={treatmentModalStyle.treatmentInput}
                      formGroupClass={treatmentModalStyle.formGroup}
                      label="Commentaire"
                      placeholder="votre commentaire"
                      name="userComment"
                      value={treatmentData.userComment}
                      onChange={handleInputChange}
                      error={errors.userComment}
                  
                      
                  />

                  <div>
                      <TextInput
                        inputClassName={treatmentModalStyle.treatmentInput}
                        formGroupClass={treatmentModalStyle.formGroup}
                        label="Date de Traitement"
                        type="date"
                        name="treatmentDate"
                        value={treatmentData.treatmentDate}
                        onChange={handleInputChange}
                        
                      />
                      <SelectInput
                        inputClassName={treatmentModalStyle.treatmentInput}
                        formGroupClass={treatmentModalStyle.formGroup}
                        label="Statut"
                        name="status"
                        value={treatmentData.status}
                        onChange={handleInputChange}
                        options={statusOptions}
                      />
                  </div>
                  <div className={treatmentModalStyle.btnContainer}>
                      <Button type="submit" className="validationBtn" colorStyle="whiteBtn" disabled={!isFormReadyForSubmission()}>Valider</Button>
                      <Button type="button" className="cancelBtn" colorStyle="whiteBtn" onClick={onClose}>Annuler</Button>
                  </div>
              </form>  
          </div>
      </div>
    );
};

export default TreatmentContactModal;