import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../../components/common/Header/Header';
import ModerationSection from '../../../components/Testimonies/admin/ModerationSection/ModerationSection';
import H2Title from '../../../components/common/H2Title/H2Title';

import './testimoniesManager.css';
import ValidateTestimoniesSection from '../../../components/Testimonies/admin/ValidateTestimonies/ValidateTestimoniesSection';
import RejectedTestimoniesSection from '../../../components/Testimonies/admin/RejectedTestimonies/RejectedTestimonies';

import useGetUnmoderatedTestimonies from '../../../components/Testimonies/hooks/useFetchUnmoderatedTestimonies';
import useFetchRejectedTestimonies from '../../../components/Testimonies/hooks/useFetchRejectedTestimonies';
import useFetchModeratedTestimonies from '../../../components/Testimonies/hooks/useFetchModeratedTestimonies';
import useFetchApproveTestimony from '../../../components/Testimonies/hooks/useFetchApproveTestimony';
import useFetchRejectTestimony from '../../../components/Testimonies/hooks/useFetchRejectTestimony';
import CreationSection from '../../../components/Testimonies/admin/CreationSection/CreationSection';

const TestimoniesManager = () => { 

    //Etat pour les listes de témoignages
    const [unmoderatedTestimonies, setUnmoderatedTestimonies] = useState([]);
    const [moderatedTestimonies, setModeratedTestimonies] = useState([]);
    const [rejectedTestimonies, setRejectedTestimonies] = useState([]);

    //Récupération des données initiales
    const { testimonies: initialUnmoderatedTestimonies } = useGetUnmoderatedTestimonies();
    const { testimonies: initialRejectedTestimonies } = useFetchRejectedTestimonies();
    const { testimonies: initialModeratedTestimonies } = useFetchModeratedTestimonies();

    const { approveThisTestimony } = useFetchApproveTestimony();
    const { rejectThisTestimony } = useFetchRejectTestimony();

    useEffect(() => {
    
        setUnmoderatedTestimonies(initialUnmoderatedTestimonies.filter(t => !t.isModerated));
        setModeratedTestimonies(initialModeratedTestimonies);
        setRejectedTestimonies(initialRejectedTestimonies);
    }, [initialUnmoderatedTestimonies, initialModeratedTestimonies, initialRejectedTestimonies]);


    const handleCreateTestimony = useCallback((newTestimonyData) => {
        if (newTestimonyData) {
            setUnmoderatedTestimonies(prevTestimonies => [...prevTestimonies, newTestimonyData]);
        }
    }, []);
    

    const handleApproveTestimony = useCallback((testimonyId) => {
        approveThisTestimony(testimonyId, () => {
            setUnmoderatedTestimonies(prevTestimonies => prevTestimonies.filter(t => t.idTestimony !== testimonyId));
            
            const approvedTestimony = unmoderatedTestimonies.find(t => t.idTestimony === testimonyId);
            if (approvedTestimony) {
                setModeratedTestimonies(prevTestimonies => [...prevTestimonies, approvedTestimony]);
            }
        });
    }, [approveThisTestimony, unmoderatedTestimonies]);



    const handleRejectTestimony = useCallback((testimonyId) => {
        rejectThisTestimony(testimonyId, () => {
            setUnmoderatedTestimonies(prevTestimonies => prevTestimonies.filter(t => t.idTestimony !== testimonyId));
            
            const rejectedTestimony = unmoderatedTestimonies.find(t => t.idTestimony === testimonyId);
            if (rejectedTestimony) {
                setRejectedTestimonies(prevTestimonies => [...prevTestimonies, rejectedTestimony]);
            }
        });
    }, [rejectThisTestimony, unmoderatedTestimonies]); 
    


  
  return (
    <>

        <Header title="Avis Clients" slogan="Gestion des avis clients"/>
        <main>

            <CreationSection onCreateTestimony={handleCreateTestimony}/>

            <H2Title h2Text="Vos avis client en attente de modération" className="moderationSectionTitle"/>
            <ModerationSection
                testimonies={unmoderatedTestimonies}
                onApprove={handleApproveTestimony}
                onReject={handleRejectTestimony}               
            />

            <H2Title h2Text="Vos avis clients publiés" className="validateTestimoniesTitle"/>
            <ValidateTestimoniesSection  testimonies={moderatedTestimonies}/>

            <H2Title h2Text="Vos avis clients rejetés" className="rejectedTestimoniesTitle"/>
            <RejectedTestimoniesSection  testimonies={rejectedTestimonies}/>

        </main>     
    </>
  );
};

export default TestimoniesManager;