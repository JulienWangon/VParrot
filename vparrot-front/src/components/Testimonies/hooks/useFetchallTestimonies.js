import { useState, useEffect } from "react";
import { fetchAllTestimonies } from "../testimoniesService";
import { useMessage } from "../../../contexts/MessagesContext";


const useFetchAllTestimonies = () => {

    const [testimonies, setTestimonies] = useState({ "en attente": [], "approuvé": [], "rejeté": []});
    const [isLoading, setIsLoading] = useState(false);
    const { showMessage } = useMessage();


    useEffect(() => {

        const fetchData = async () => {

            setIsLoading(true);

            try {
                
                const response = await fetchAllTestimonies();
                console.log(response);
                if (response) {
                    if (response && response['en attente'] && response['approuvé'] && response['rejeté']) {
                        setTestimonies(response); // Mise à jour de l'état avec les données
                    } else {
                        // Gérer le cas où la structure de la réponse n'est pas celle attendue
                        showMessage({ message: "La récupération des témoignages a échoué" }, 'error');
                    }
                    
                } else {
                    // Gérer le cas où la réponse n'est pas un succès
                    showMessage({ message: "La récupération des témoignages a échoué" }, 'error');
                }
                
  
            } catch (error) {

                if (error.response && error.response.data && error.response.data.status === 'error') {

                // Utilisation du message d'erreur de l'API
                showMessage({ message: error.response.data.message || "Erreur lors de l'opération" }, 'error');
                } else {

                // Gestion des autres types d'erreurs (par exemple, erreur réseau)
                showMessage({ message: error.message || "Une erreur s'est produite" }, 'error');
                }
            } finally {

              setIsLoading(false);
            }
        };

        fetchData();
    }, [showMessage]);

    return { testimonies, setTestimonies, isLoading};
}

export default useFetchAllTestimonies;