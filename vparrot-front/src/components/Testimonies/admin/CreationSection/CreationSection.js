import React, { useState } from 'react';
import Button from '../../../common/Buttons/Button/Button';
import TestimonyModal from '../../public/TestimonyModal/TestimonyModal';

import './creationSection.css';


const CreationSection = ({ onCreateTestimony }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return (
      <section className="creationSection">
          <div className="creationContainer">

              <Button className="testyCreation" colorStyle="redBtn" onClick={handleOpenModal}>Créer un avis client</Button>

              {isModalOpen && (

                  <TestimonyModal mode="creation" onClose={handleCloseModal} onTestimonyCreated={onCreateTestimony}/>
              )}

          </div>        
      </section>
    );
};

export default CreationSection