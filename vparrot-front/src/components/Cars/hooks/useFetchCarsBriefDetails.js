import { useState, useEffect } from "react";
import { fetchCarsBriefDetails } from "../CarsService";

const useFetchCarsBriefDetails = () => {

    const [carsBriefDetails, setCarBriefDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

      const fetchData = async () => {

        try {

          const carsBriefDetails = await fetchCarsBriefDetails();
          setCarBriefDetails(carsBriefDetails);
        } catch (error) {

          setError(error.message || "Une erreur est survenue lors de la récupération des détails des véhicules. ")
        } finally {

            setLoading(false);
        }
    };

    fetchData();
}, []);

return { carsBriefDetails, loading, error };   
    
}

export default useFetchCarsBriefDetails;