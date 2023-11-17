import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import TextInput from '../../common/Input/TextInput/TextInput';
import { validateEmail, validatePassword } from '../../../_utils/validation';
import useChangeUserPassword from '../hook/useChangeUserPassword';
import { useMessage } from '../../../contexts/MessagesContext';
import { useNavigate } from 'react-router-dom';



const reCaptchaKey = "6Le8ugwpAAAAAGo_7BMdYwZ_gZfNGLLXcCqb_TXC";

const ResetPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const { loading, changePassword } = useChangeUserPassword();
    const { showMessage } = useMessage();
   

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const jwtToken = queryParams.get('token');
        console.log("JWT Token:", jwtToken);
        if (jwtToken) {
            setToken(jwtToken);
        }
    }, [location]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                setErrors({...errors, email: validateEmail(value)});
                break;
            case 'newPassword':
                setNewPassword(value);
                setErrors({...errors, newPassword: validatePassword(value)});
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                setErrors({...errors, confirmPassword: value !== newPassword ? "Les mots de passe ne correspondent pas." : ''});
                break;
            default:
                break;
        }
    };

    const isFormReadyForSubmission = () => {
        return email && !errors.email && 
               newPassword && confirmPassword && 
               !errors.newPassword && !errors.confirmPassword && 
               newPassword === confirmPassword && captchaValue && token && !loading;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormReadyForSubmission()) {
            return;
        }

        try {
           
            const message = await changePassword(email, newPassword, captchaValue, token);
            showMessage(message, "success");
            setEmail('');
            setNewPassword('');
            setConfirmPassword('');
            setCaptchaValue(null);
            navigate("/access-panel");
          
        } catch (error) {
            showMessage("Erreur lors du changement de mot de passe: " + error.message, "error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                error={errors.email}
            />
            <TextInput
                label="Nouveau Mot de Passe"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handleInputChange}
                error={errors.newPassword}
            />
            <TextInput
                label="Confirmer le Nouveau Mot de Passe"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
            />
            {newPassword && confirmPassword && !errors.newPassword && !errors.confirmPassword && (
                <ReCAPTCHA
                    sitekey={reCaptchaKey}
                    onChange={(value) => setCaptchaValue(value)}
                />
            )}
            <button type="submit" disabled={!isFormReadyForSubmission()}>
                Changer le Mot de Passe
            </button>
        </form>
    );
};

export default ResetPassword;
