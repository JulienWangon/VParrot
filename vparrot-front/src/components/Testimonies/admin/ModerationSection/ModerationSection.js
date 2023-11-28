import React, { useState } from "react";

import { useTestimonies } from '../../../../contexts/TestimoniesContext';

import TabCardTestimony from "../TabCardTestimony/TabCardTestimony";
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

import './moderationSection.css';


const ModerationSection = () => {

    const { testimonies, approveTestimony, rejectTestimony } = useTestimonies();
    const enAttenteTestimonies = testimonies['en attente'];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTestimony, setSelectedTestimony] = useState(null);

    const handleOpenModal = (testimony) => {
        setSelectedTestimony(testimony);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTestimony(null);
    };


    const handleApprove = () => {
        if(selectedTestimony) {
            approveTestimony(selectedTestimony.idTestimony);
            handleCloseModal();
        }
    };

    const handleReject = () => {
        if(selectedTestimony) {
            rejectTestimony(selectedTestimony.idTestimony);
            handleCloseModal();
        }
    };

    return (
        <section className="moderationSection">

            {enAttenteTestimonies.length > 0 ? (
                <>
                    <p className="validationCount">Vous avez {enAttenteTestimonies.length} avis en attente de modération.</p>
                    <TabCardTestimony 
                        testimonies={enAttenteTestimonies} 
                        onOpenModal={handleOpenModal} 
                    />
                    {isModalOpen && selectedTestimony && (
                        <TestimonyModal
                            mode="moderation" 
                            testimony={selectedTestimony} 
                            onClose={handleCloseModal}
                            approveThisTestimony={handleApprove}
                            rejectThisTestimony={handleReject}  
                        />
                    )}
                </>
        ) : (
            <p className="validationInfo">Vous n'avez pas d'avis en attente de modération.</p>
        )}
        </section>
    );

}

export default ModerationSection;