import { useState, useEffect } from "react";
import { fetchSchedules } from "../footerService";

const useFetchSchedules = () => {

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {

        const fetchData = async () => {
        
            try {

                const schedules = fetchSchedules();
                setSchedules(schedules);

            } catch (error) {

              setError(error.message || "Une erreur est survenue lors de la récupération des horaires d'ouverture. ")
            } finally {

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { schedules, loading, error };
}

export default useFetchSchedules;

