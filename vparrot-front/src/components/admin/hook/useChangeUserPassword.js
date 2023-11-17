import { useState } from "react";
import { changeUserPassword } from "../passwordService";

const useChangeUserPassword = () => {

    const[loading, setLoading] = useState(false);

    const changePassword = async (email, newPassword, captchaValue, token) => {
        setLoading(true);

        try {

            const response = await changeUserPassword(email, newPassword, captchaValue, token);
            return response.message;
        } finally {

          setLoading(false);
        }
    };

    return { loading, changePassword };
};

export default useChangeUserPassword;