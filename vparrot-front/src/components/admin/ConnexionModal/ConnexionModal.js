import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useMessage } from '../../../contexts/MessagesContext';
import ReCAPTCHA from "react-google-recaptcha";

import H2Title from '../../common/H2Title/H2Title';
import TextInput from '../../common/Input/TextInput/TextInput';
import Button from '../../common/Buttons/Button/Button';

import { validateEmail, validatePassword } from '../../../_utils/validation';

import ModalStyle from './connexionModal.module.css';

const maxLoginAttemps = 4;
const reCaptchaKey ="6LfaqvUoAAAAALPzrRTvifhm7qlDBmh7RfEfTUOI";

const ConnexionModal = ({ handleCloseModal }) => {

    const { login, error, loading, clearErrors } = useAuth();
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [captchaValue, setCaptchaValue] = useState(false);

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

    const handleCaptcha = (value) => {
        setCaptchaValue(value); // Mettre à jour la valeur du CAPTCHA
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loginAttempts >= maxLoginAttemps && !captchaValue) {
            showMessage("Veuillez compléter le CAPTCHA.", "error");
            return;
        }

        if (validate()) {
            try {
                const result = await login(data.email, data.password);

                if (result) {
                showMessage("Connecté avec succès!", "success");
                setCaptchaValue(null);
                setLoginAttempts(0);
                handleCloseModal();
            } else {
                throw new Error("Identifiants invalides"); // Utilisez l'état `error` ou un message par défaut
            }
            } catch (error) {
                setLoginAttempts((prev) => prev + 1);
                showMessage("Identifiants invalides", "error");
            }
        } else {
            showMessage("La validation du formulaire a échoué.", "error");
        }
    };

    return (


        <div className={ModalStyle.formContainer}>
            <div className={ModalStyle.opacityLayer}></div>
            <Button className={ModalStyle.circleBtn} colorStyle="whiteBtn" onClick={handleCloseModal}>X</Button>

            <form method="POST" onSubmit={handleSubmit}>
                <div className="titleContainer">
                <H2Title className="userFormTitle" h2Text="Identifiez vous"/>
                </div>
                <TextInput
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Entrez votre email"
                />
                {errors.email && <div className="errorMessage">{errors.email}</div>}

                <TextInput
                    label="Mot de passe"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Entrez votre mot de passe"                            
                />
                {errors.password && <div className="errorMessage">{errors.password}</div>}

                {loginAttempts >= maxLoginAttemps && (
                    <ReCAPTCHA
                        sitekey={reCaptchaKey}
                        onChange={handleCaptcha}
                    />
                )}

                <Button
                    content="Connexion"
                    type="submit"
                    className="submitBtn"
                    disabled={loginAttempts >= maxLoginAttemps} // Désactiver le bouton après le nombre maximum de tentatives            
                />
                {error && <div className="errorMessage">{error}</div>}
                {loading && <div className="loadingMessage">Chargement...</div>}

                {loginAttempts > 0 && loginAttempts < maxLoginAttemps && (
                    <div className="infoMessage">
                        {`Vous avez ${maxLoginAttemps - loginAttempts} tentative(s) restante(s).`}
                    </div>
                )}
            </form>      
        
        </div>
    );
};

export default ConnexionModal;