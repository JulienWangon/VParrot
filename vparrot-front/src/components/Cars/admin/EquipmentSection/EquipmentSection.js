import React, {useState} from 'react';
import EquipmentItem from '../EquipmentItem/EquipmentItem';
import H3Title from '../../../common/H3Title/H3Title';
import AddEquipmentModal from '../AddEquipmentModal/AddEquimentModal';

import './equipmentSection.css';

const EquipmentSection = ({ type, typeId, equipments, selectedEquipments, onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening equipment modal for type:", type);
    setIsModalOpen(true);
  }

  
  const closeModal = () => {
    console.log("Closing equipment modal for type:", type);
    setIsModalOpen(false);
  };
  return (
    <div className="choiceEquipmentSection">
      <div className="sectionHeader">
        <H3Title h3Text={type} className="sectionEquipmentsTitle" />
        <button type="button" className="addEquipmentButton" onClick={openModal} aria-label="Ajouter un nouvel équipement">
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
      <div className="equipmentContainer">
        {equipments.map(equipment => (
          <EquipmentItem
            key={equipment.idEquipment}
            equipment={equipment}
            isSelected={selectedEquipments.includes(equipment.idEquipment)} 
            onSelect={() => onSelect(equipment.idEquipment)} 
          />
        ))}
      </div>
      {isModalOpen && <AddEquipmentModal isOpen={isModalOpen} onClose={closeModal} type={type} typeId={typeId} />}
    </div>
  );
};

export default EquipmentSection;
