import React, { useState } from 'react';
import useFetchModeratedTestimonies from '../../hooks/useFetchModeratedTestimonies';
import TestimonyTable from '../TestimonyTab/TestimonyTable';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

const ValidateTestimoniesSection = () => {

    const { testimonies, loading } = useFetchModeratedTestimonies();
    const [selectedTestimony, setSelectedTestimony] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (testimony) => {

        setSelectedTestimony(testimony);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <section className="validateTestimonies">
         {testimonies.length > 0 ? (
        <>
            <p>Vous avez {testimonies.length} avis publiés sur votre page d'acceuil.</p>
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
        <p>Vous n'avez pas d'avis publiés actuellement.</p>
    )}
        
    </section>
    );
};

export default ValidateTestimoniesSection;