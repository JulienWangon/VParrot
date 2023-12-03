import React, { useState } from 'react';

import useAddUser from '../hooks/useAddUser';

import TextInput from '../../common/Input/TextInput/TextInput';
import SelectInput from '../../common/Input/SelectInput/SelectInput';
import H2Title from '../../common/H2Title/H2Title';
import Button from '../../common/Buttons/Button/Button';

import userModalStyle from './userModal.module.css';

import { validateEmail, validateName } from '../../../_utils/validation';

const UserModal = ({ onClose, roles, users, onAddUser }) => {

    const { addNewUser, isLoading } = useAddUser();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        userEmail: '',
        roleId: ''
  
    });

    //Etat pour stocker les erreurs de validations des champs
    const [ errors, setErrors] = useState({});

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });


       //Validations des entrées de champs en fonction des régles de validation
    const newErrors = { ...errors };
  
    switch (name) {
      case 'lastName':
      case 'firstName':
          newErrors[name] = validateName(value)
          break;
      case 'userEmail':
          newErrors.content = validateEmail(value);
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
      return Object.values(userData).every(value => value !== '');
    };

    //Varification si le formulaire est pret a etre envoyer
    const isFormReadyForSubmission = () =>{
      return hasNoErrors() && userData;
    }



    const handleSubmit = async (e) => {
      e.preventDefault();

      if (areAllFieldsFilled() && hasNoErrors()) {
          const dataToSend = { ...userData };
          
          try {

              const newUser = await addNewUser(dataToSend); 
              onAddUser(newUser);
              onClose();
          } catch (error) {
              console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
          }
      }
  };

    if(isLoading) return <div>Chargement...</div>
   

    return (
      <div className={userModalStyle.modalOverlay}>
          <div className={userModalStyle.formContainer}>
              <H2Title h2Text="Ajoutez un utilsateur" className={userModalStyle.userModalTitle} colorStyle="whiteTitle"/>
              <form className={userModalStyle.createUser} onSubmit={handleSubmit}>
                  <TextInput
                      formGroupClass={userModalStyle.formGroup}
                      inputClassName={userModalStyle.userInput}
                      label="Nom"
                      name="lastName"
                      type="text"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                  />
  
                  <TextInput
                      formGroupClass={userModalStyle.formGroup}
                      inputClassName={userModalStyle.userInput}
                      label="Prénom"
                      name="firstName"
                      type="text"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                  />
  
                  <TextInput
                      formGroupClass={userModalStyle.formGroup}
                      inputClassName={userModalStyle.userInput}
                      label="Email"
                      name="userEmail"
                      type="text"
                      value={userData.userEmail}
                      onChange={handleInputChange}
                      error={errors.userEmail}
                  />
  
                  <SelectInput
                    formGroupClass={userModalStyle.formGroup}
                    inputClassName={userModalStyle.userInput}
                    label="Rôle"
                    name="roleId"
                    value={userData.roleId}
                    onChange={handleInputChange}
                    options={[
                    
                        { id: null, value: "", label: "Choisir un rôle" },
                        ...roles.map(role => ({
                            id: role.idRole,
                            value: role.idRole,
                            label: role.roleName
                        }))
                  ] }
                  />

                  <div className={userModalStyle.btnContainer}>
                        <Button type="submit" className={userModalStyle.addBtn} colorStyle="whiteBtn" disabled={!isFormReadyForSubmission()}>Ajouter</Button>
                        <Button className={userModalStyle.addBtn} onClick={onClose} colorStyle="whiteBtn">Annuler</Button>
                  </div>
              </form>
          </div>     
      </div>
    );     
};

export default UserModal;