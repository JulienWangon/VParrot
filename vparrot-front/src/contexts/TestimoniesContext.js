import React, { createContext, useContext } from 'react';

import useFetchAllTestimonies from '../components/Testimonies/hooks/useFetchAllTestimonies';
import useFetchCreateTestimony from '../components/Testimonies/hooks/useFetchCreateTestimony';
import useFetchApproveTestimony from '../components/Testimonies/hooks/useFetchApproveTestimony';
import useFetchRejectTestimony from '../components/Testimonies/hooks/useFetchRejectTestimony';
import useFetchDeleteTestimony from '../components/Testimonies/hooks/useFetchDeleteTestimony';

const TestimoniesContext = createContext();

export const useTestimonies = () => useContext(TestimoniesContext);

export const TestimoniesProvider = ({ children }) => {

    

    const { testimonies, setTestimonies, isLoading: isLoadingAllTestimonies } = useFetchAllTestimonies();

    const { createNewTestimony, loading: isLoadingCreateTestimony } = useFetchCreateTestimony();
    const { approveThisTestimony, loading: isLoadingApproveTestimony } = useFetchApproveTestimony();
    const { rejectThisTestimony, loading: isLoadingRejectTestimony } = useFetchRejectTestimony();
    const { deleteThisTestimony, isLoading: isLoadingDeleteTestimony } = useFetchDeleteTestimony();



    //Ajouter un avis client 
    const addTestimony = (newTestimonyData) => {
        createNewTestimony(newTestimonyData)
        
            .then(newTestimony => {
               
                setTestimonies(prev => {
                    const updatedTestimonies = {...prev, "en attente": [newTestimony, ...prev["en attente"]]};
                  
                    return updatedTestimonies;
                });
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout d'un témoignage:", error);
            });
    };

    //fonction pour approuver un avis client 
    const approveTestimony = (idTestimony) => {

        approveThisTestimony(idTestimony)
            .then(() => {
                // Mettre à jour l'état seulement après la réussite de l'approbation
                setTestimonies(prev => {
                    const updatedEnAttente = prev["en attente"].filter(t => t.id !== idTestimony);
                    const approvedTestimony = prev["en attente"].find(t => t.id === idTestimony);
                    const updatedApprouvé = approvedTestimony ? [approvedTestimony, ...prev["approuvé"]] : prev["approuvé"];
                    return { ...prev, "en attente": updatedEnAttente, "approuvé": updatedApprouvé };
                });
            })
            .catch(error => {

                console.error("Erreur lors de l'approbation d'un témoignage:", error);
            });
    };


    //fonction pour rejeter un avis client 
    const rejectTestimony = (idTestimony) => {

        rejectThisTestimony(idTestimony)
            .then(() => {
                // Mettre à jour l'état après le rejet réussi
                setTestimonies(prev => {
                    const updatedEnAttente = prev["en attente"].filter(t => t.id !== idTestimony);
                    const rejectedTestimony = prev["en attente"].find(t => t.id === idTestimony);
                    const updatedRejeté = rejectedTestimony ? [rejectedTestimony, ...prev["rejeté"]] : prev["rejeté"];
                    return { ...prev, "en attente": updatedEnAttente, "rejeté": updatedRejeté };
                });
            })
            .catch(error => {

                console.error("Erreur lors du rejet d'un témoignage:", error);
            });
    };


    // Fonction pour supprimer un témoignage
    const deleteTestimony = (idTestimony) => {
        deleteThisTestimony(idTestimony)
            .then(() => {
            // Mettre à jour l'état après la suppression réussie
                setTestimonies(prev => {
                    const updatedRejeté = prev["rejeté"].filter(t => t.id !== idTestimony);
                    return { 
                        ...prev,
                        "rejeté": updatedRejeté
                    };
                });
            })
        .catch(error => {
            console.error("Erreur lors de la suppression d'un témoignage:", error);
        });
    };

    return (
        <TestimoniesContext.Provider value = {{
            testimonies,
            isLoadingAllTestimonies,
            isLoadingCreateTestimony,
            isLoadingApproveTestimony,
            isLoadingRejectTestimony,
            isLoadingDeleteTestimony,
            addTestimony,
            approveTestimony,
            rejectTestimony,
            deleteTestimony
        }}>
            {children}
        </TestimoniesContext.Provider>
    );
};



