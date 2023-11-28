import React, { useState } from 'react';

import TestimonyTable from '../TestimonyTab/TestimonyTable';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

const RejectedTestimoniesSection = ({ testimonies }) => {

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
       {testimonies.length > 0 ? (
      <>
          <p className="validationCount">Vous avez {testimonies.length} avis rejetés actuellement.</p>
          <TestimonyTable
              testimonies={testimonies} 
              onOpenModal={handleOpenModal} 
          />
          {isModalOpen && selectedTestimony && (
              <TestimonyModal
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