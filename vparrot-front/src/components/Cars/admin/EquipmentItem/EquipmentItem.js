import React from 'react';
import './equipmentItem.css';

const EquipmentItem = ({ equipment, onSelect, isSelected }) => {
  
  const handleChange = () => {
    onSelect(equipment.idEquipment);
  };

  return (
    <div className="checkboxAsButton">
      <input
        type="checkbox"
        id={`checkbox-${equipment.idEquipment}`}
        className="hiddenCheckbox"
        checked={isSelected}
        onChange={handleChange}
      />
      <label
        htmlFor={`checkbox-${equipment.idEquipment}`}
        className={isSelected ? "selectedEquipment" : "equipment"}
      >
        {equipment.denomination}
      </label>
    </div>
  );
};

export default EquipmentItem;
