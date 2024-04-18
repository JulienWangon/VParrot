import React, {useState} from 'react';
import Header from '../../../components/common/Header/Header';
import Button from '../../../components/common/Buttons/Button/Button';
import EditCarModal from '../../../components/Cars/admin/EditCarModal/EditCarModal';

import './carsManager.css';
import CarsTab from '../../../components/Cars/admin/CarsTab/CarsTab';

const CarsManager = () => {

  const [showModal, setShowModal] = useState(false);
 

  const openModal = () => {
    console.log("Opening car management modal");
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Closing car management modal");
    setShowModal(false);
  };


  return (
    <>
      <Header title="Parc Auto" slogan="Gestion des ventes de véhicules"/>
      <div className="newCarContainer">
          <Button className="addCarBtn" colorStyle="redBtn"  onClick={() => openModal()}>Nouveau véhicule</Button>
          {showModal && (
              <EditCarModal
          isOpen={showModal}
          onClose={closeModal}
        />
      )}
      </div>
      <CarsTab/>
      
    </>
  );
};

export default CarsManager;