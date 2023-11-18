import { useState } from "react";
import { rejectTestimony } from "../testimoniesService";
import { useMessage } from "../../../contexts/MessagesContext";

const useFetchRejectTestimony = () => {

    const { showMessage } = useMessage();
    const [isloading, setIsLoading] = useState(false);

    const rejectThisTestimony = async (idTestimony) => {

        setIsLoading(true);

        try {

            const response = await rejectTestimony(idTestimony);

            showMessage({ data: response }, 'success');
            return response;
        } catch (error) {

            showMessage( { data: error.response }, 'error');
            throw error;

        }finally {

            setIsLoading(false);
        }    
    } ;
    
    return { rejectThisTestimony, isloading };
}

export default useFetchRejectTestimony;