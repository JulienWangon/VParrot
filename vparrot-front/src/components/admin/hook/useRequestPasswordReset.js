import { useState } from 'react';
import { requestPasswordReset } from '../passwordService';

const useRequestPasswordReset = () => {
    
    const [loading, setLoading] = useState(true);

    const resetPasswordRequest = async (email, captchaValue) => {

        try {

            const message = await requestPasswordReset(email, captchaValue);
            return message;
        } finally {

            setLoading(false);
        }
    };

    return { loading, resetPasswordRequest };
};

export default useRequestPasswordReset;