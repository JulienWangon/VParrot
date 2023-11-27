import React, { useState } from "react";

import TabCardTestimony from "../TabCardTestimony/TabCardTestimony";
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

import './moderationSection.css';


const ModerationSection = ( { testimonies, onApprove, onReject} ) => {

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
            onApprove(selectedTestimony.idTestimony);
            handleCloseModal();
        }
    };

    const handleReject = () => {
        if(selectedTestimony) {
            onReject(selectedTestimony.idTestimony)
            handleCloseModal();
        }
    };

    return (
        <section className="moderationSection">

            {testimonies.length > 0 ? (
                <>
                    <p className="validationCount">Vous avez {testimonies.length} avis en attente de modération.</p>
                    <TabCardTestimony 
                        testimonies={testimonies} 
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