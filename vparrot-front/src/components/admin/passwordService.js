import instanceAxios from "../../_utils/axios";

export const requestPasswordReset = async (email, captchaValue) => {

    try {

      const response = await instanceAxios.post('/request-password-reset', { email: email, captchaToken: captchaValue });
      if (response) {

          return response.data.message;
      }
    } catch (error) {

        throw error;
    }
};



export const changeUserPassword = async (email, newPassword, token, captchaValue) => {

    try {

        const response = await instanceAxios.post('/change-password', {email, newPassword, token, captchaValue });
        if(response) {

            return response.data;
        }
    } catch (error) {

        throw error;
    }
};

