import React, { useState } from "react";
import TextInput from "../../../common/Input/TextInput/TextInput";
import { useCars } from "../../../../contexts/CarContext";
import { useAuth } from "../../../../contexts/AuthContext";

import './addEquipmentModal.css';

const AddEquipmentModal = ({ isOpen, onClose, type, typeId }) => {

  const [equipmentName, setEquipmentName] = useState("");

  const { createEquipment, loadingAddEquipment, errorAddEquipment } = useCars();
  const { csrfToken } = useAuth();

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
      
    }
  };

  const handleChange = (event) => {
    setEquipmentName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); 
   
      const dataToSend = {
        typeId: typeId,
        name: equipmentName
      };

      try {
        await createEquipment(dataToSend, csrfToken);
        onClose();
        
      } catch (error) {
        console.error("Erreur de création d'un équipement" , error)
      }
    
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" >
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>Ajouter un équipement pour {type}</h2>
        <div>
          <TextInput
            inputClassName="inputGroup"
            className="addEquipmentInput"
            label="Nom de l'équipement"
            placeholder="Entrez le nom de l'équipement"
            name="equipmentName"
            type="text"
            value={equipmentName}
            onChange={handleChange}
          />

          {loadingAddEquipment && <p>Chargement...</p>}
          {errorAddEquipment && <p>Erreur: {errorAddEquipment}</p>}
          <button type="submit" onClick={handleSubmit}  className="submitBtn">Ajouter</button>
        </div>
      </div>
    </div>
  );
};

export default AddEquipmentModal;

