import React, { useState} from "react";
import useGetUnmoderatedTestimonies from "../../hooks/useFetchUnmoderatedTestimonies";
import TabCardTestimony from "../TabCardTestimony/TabCardTestimony";
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

import './moderationSection.css';


const ModerationSection = ( { onTestimonyApproved }) => {

  const { testimonies, loading } = useGetUnmoderatedTestimonies();
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (testimony) => {
      setSelectedTestimony(testimony);
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <section className="moderationSection">
    {testimonies.length > 0 ? (
        <>
            <p>Vous avez {testimonies.length} avis en attente de modération.</p>
            <TabCardTestimony 
                testimonies={testimonies} 
                onOpenModal={handleOpenModal} 
            />
            {isModalOpen && selectedTestimony && (
                <TestimonyModal
                    mode="moderation" 
                    testimony={selectedTestimony} 
                    onClose={handleCloseModal}
                    onApproved={onTestimonyApproved} 
                />
            )}
        </>
    ) : (
        <p>Vous n'avez pas d'avis en attente de modération.</p>
    )}
</section>
  );

}

export default ModerationSection;