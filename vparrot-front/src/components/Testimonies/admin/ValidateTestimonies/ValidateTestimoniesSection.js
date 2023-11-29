import React, { useState } from 'react';

import { useTestimonies } from '../../../../contexts/TestimoniesContext';

import TestimonyTable from '../TestimonyTab/TestimonyTable';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

import './validateTestimoniesSection.css';

const ValidateTestimoniesSection = () => {

    const { testimonies } = useTestimonies();
    const approvedTestimonies = testimonies['approuvé'];

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

    return (
        <section className="validateTestimonies">
         {approvedTestimonies.length > 0 ? (
        <>
            <p className="validationCount">Vous avez <strong>{approvedTestimonies.length}</strong> avis publiés sur votre page d'acceuil.</p>
            <TestimonyTable testimonies={approvedTestimonies} onOpenModal={handleOpenModal}/>
        
            {isModalOpen && selectedTestimony && (
                        <TestimonyModal
                            mode="suppression" 
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