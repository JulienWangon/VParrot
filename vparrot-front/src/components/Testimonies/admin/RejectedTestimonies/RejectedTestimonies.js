import React, { useState } from 'react';
import useFetchRejectedTestimonies from '../../hooks/useFetchRejectedTestimonies';
import TestimonyTable from '../TestimonyTab/TestimonyTable';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

const RejectedTestimoniesSection = () => {

    const { testimonies, loading} = useFetchRejectedTestimonies();
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
          <p>Vous avez {testimonies.length} avis rejetés actuellement.</p>
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
      <p>Vous n'avez pas d'avis rejetés actuellement.</p>
  )}
     
  </section>
  );
};

export default RejectedTestimoniesSection;