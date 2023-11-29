import React, { useState } from 'react';

import { useTestimonies } from '../../../../contexts/TestimoniesContext';

import TestimonyTable from '../TestimonyTab/TestimonyTable';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

const RejectedTestimoniesSection = () => {

    const { testimonies } = useTestimonies();
    const rejectedTestimonies = testimonies['rejeté'];

    const [selectedTestimony, setSelectedTestimony] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (testimony) => {
        console.log("Avis sélectionné :", testimony);
        setSelectedTestimony(testimony);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }



    return (
      <section className="validateTestimonies">
       {rejectedTestimonies.length > 0 ? (
      <>
          <p className="validationCount">Vous avez {rejectedTestimonies.length} avis rejetés actuellement.</p>
          <TestimonyTable
              testimonies={rejectedTestimonies} 
              onOpenModal={handleOpenModal} 
          />
          {isModalOpen && selectedTestimony && (
              <TestimonyModal
                  mode="suppression"
                  testimony={selectedTestimony} 
                  onClose={handleCloseModal} 
              />
          )}
      </>
  ) : (
      <p className="validationInfo">Vous n'avez pas d'avis rejetés actuellement.</p>
  )}
     
  </section>
  );
};

export default RejectedTestimoniesSection;