import React, { useState } from 'react';

import TestimonyTable from '../TestimonyTab/TestimonyTable';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

import './validateTestimoniesSection.css';

const ValidateTestimoniesSection = ({ testimonies }) => {

  
    const [selectedTestimony, setSelectedTestimony] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (testimony) => {
        setSelectedTestimony(testimony);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTestimony(null)
    }

    
    return (
        <section className="validateTestimonies">
         {testimonies.length > 0 ? (
        <>
            <p className="validationCount">Vous avez <strong>{testimonies.length}</strong> avis publiés sur votre page d'acceuil.</p>
            <TestimonyTable
                testimonies={testimonies} 
                onOpenModal={handleOpenModal} 
            />
            {isModalOpen && selectedTestimony && (
                <TestimonyModal
                    mode="moderation" 
                    testimony={selectedTestimony} 
                    onClose={handleCloseModal} 
                />
            )}
        </>
    ) : (
        <p className="validationInfo">Vous n'avez pas d'avis publiés actuellement.</p>
    )}
        
    </section>
    );
};

export default ValidateTestimoniesSection;