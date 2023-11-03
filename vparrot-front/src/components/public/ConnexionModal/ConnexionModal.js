import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useMessage } from '../../../contexts/MessagesContext';

import H2Title from '../../common/H2Title/H2Title';
import TextInput from '../../common/TextInput/TextInput';
import Button from '../../common/Button/Button';

import { validateEmail, validatePassword } from '../../../_utils/validation';

import ModalStyle from './connexionModal.module.css';




const ConnexionModal = ({ closeModal }) => {

    const { login, error, loading, clearErrors } = useAuth();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const { showMessage } = useMessage();

    const [errors, setErrors] = useState({});

    const validate = () => {
        let isValid = true;
        let errors = {};
        // Utiliser les fonctions importées pour la validation
        errors.email = validateEmail(data.email);
        errors.password = validatePassword(data.password);
        // Vérifie si des erreurs ont été définies
        if(errors.email || errors.password) {
            isValid = false;
        }
        // Mettre à jour l'état des erreurs dans le composant        
        setErrors(errors);
        // Retourner si le formulaire est valide ou non         
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, 
            [name]: value
        }));
        setErrors({}); // Reset field-level errors upon input change
        clearErrors();  // Reset auth error upon input change
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if(validate()) { // Si la validation du formulaire est réussie
          try {
              await login(data.email, data.password); // Tentative de connexion
              showMessage("Connecté avec succès!", "success"); // Affichage d'un message de succès
          } catch (error) { // En cas d'erreur dans la tentative de connexion
              showMessage(`Échec de la connexion: ${error.message}`); // Affichage de l'erreur
          }
      } else { // Si la validation du formulaire échoue
          console.log("Validation failed"); // Log d'un message d'erreur dans la console
      }     
    };


    return (
        <div className={ModalStyle.formContainer}>
            <div className={ModalStyle.opacityLayer}></div>
            <Button className={ModalStyle.circleBtn} colorStyle="whiteBtn" onClick={closeModal}>X</Button>

            <form method="POST" onSubmit={handleSubmit}>
                <div className="titleContainer">
                <H2Title className="userFormTitle" h2Text="Identifiez vous"/>
                </div>
                <TextInput
                    label="Email"
                    name="email"
                    value={data.user_email}
                    onChange={handleChange}
                    placeholder="Entrez votre email"
                />
                {errors.email && <div className="errorMessage">{errors.email}</div>}

                <TextInput
                    label="Mot de passe"
                    name="password"
                    value={data.user_password}
                    onChange={handleChange}
                    placeholder="Entrez votre mot de passe"                            
                />
                {errors.password && <div className="errorMessage">{errors.password}</div>}

                <Button
                    content="Connexion"
                    type="submit"
                    className="submitBtn"            
                />

                {error && <div className="errorMessage">{error}</div>}
                {loading && <div className="loadingMessage">Chargement...</div>}
            </form>      
        
        </div>
    );
};

export default ConnexionModal;