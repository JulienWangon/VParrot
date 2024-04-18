import React, { useState } from 'react';
import { useCars } from '../../../../contexts/CarContext';
import { useAuth } from '../../../../contexts/AuthContext';

import TextInput from '../../../common/Input/TextInput/TextInput';
import editStyle from './editCarModal.module.css';
import H2Title from '../../../common/H2Title/H2Title';
import Button from '../../../common/Buttons/Button/Button';
import EquipmentSection from '../EquipmentSection/EquipmentSection';




const EditCarModal = ({ isOpen, onClose  }) => {

  const { createCar } = useCars();
  const { csrfToken } = useAuth();

  const { equipments, loadingEquipments, errorEquipments, refreshCarData } = useCars();
  const [mainImageIndex, setMainImageIndex] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    tradeName: '',
    price: '', 
    years: '',
    fuel: '',
    power: '',
    kilometer: '',
    transmission: '',
    body: '',
    multimedia: [],
    securite: [],
    confort: [],
    visibilite: [],
    carImages: []
  });

  

  const handleSetMainImage = (index) => {
    setMainImageIndex(index);
  };

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      carImages: files
    }));
  };

  
  const handleSelectEquipment = (type, idEquipment) => {
    const typeKey = type;
    
    setFormData(prev => ({
        ...prev,
        [typeKey]: prev[typeKey]
            ? (prev[typeKey].includes(idEquipment)
                ? prev[typeKey].filter(equipId => equipId !== idEquipment) // Si l'ID est déjà présent, retirez-le
                : [...prev[typeKey], idEquipment]) // Sinon, ajoutez l'ID
            : [idEquipment] // Si le tableau est undefined, créez un nouveau tableau avec l'ID
        
    }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    const formToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(item => formToSend.append(`${key}[]`, item));
      } else {
        formToSend.append(key, formData[key]);
      }
    });

    if (mainImageIndex !== null) {
      formToSend.append('mainImageIndex', mainImageIndex);
    }

   

    try {
      // Appel à la fonction addNewCar pour envoyer les données au serveur
      await createCar(formToSend, csrfToken);
     

      // Fermer le modal ou réinitialiser le formulaire ici
      await refreshCarData();

      onClose();
    } catch (error) {
      console.error('Failed to add car:', error);
      
    }
};

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };


  

  return (
    <div className={editStyle.modalOverlay} onClick={handleOutsideClick}>
      <div className={editStyle.formContainer}>
      <H2Title h2Text="Ajoutez un véhicule" className={editStyle.carModalTitle} colorStyle="whiteTitle"/>
      <form className={editStyle.createCar} onSubmit={handleSubmit}>

        <div className={editStyle.carInfoContainer}>
            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Constructeur"
              placeholder="Entrer le nom du constructeur"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Modèle"
              placeholder="Entrer le nom du modèle"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Dénomination commerciale"
              placeholder="Entrer la dénomination commerciale"
              name="tradeName"
              type="text"
              value={formData.tradeName}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Prix"
              placeholder="Entrer le prix"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}  
            />
        </div>

        <div className={editStyle.detailsCar}>

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Année"
              placeholder="Entrer l'année"
              name="years"
              type="text"
              value={formData.years}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Carburant"
              placeholder="Entrer le carburant"
              name="fuel"s
              type="text"
              value={formData.fuel}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Puissance"
              placeholder="Entrer la puissance"
              name="power"
              type="text"
              value={formData.power}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Kilométrage"
              placeholder="Entrer le kilométrage"
              name="kilometer"
              type="text"
              value={formData.kilometer}
              onChange={handleChange}  
            />

            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Transmissison"
              placeholder="Entrer le type de transmission"
              name="transmission"
              type="text"
              value={formData.transmission}
              onChange={handleChange}  
            />
            
            <TextInput
              formGroupClass={editStyle.formGroup}
              inputClassName={editStyle.carInput}
              label="Carrosserie"
              placeholder="type de carrosserie"
              name="body"
              type="text"
              value={formData.body}
              onChange={handleChange}  
            />
        </div>

        <div className={editStyle.equipmentSections}>
            {loadingEquipments && <p>Loading Equipment...</p>}
            {errorEquipments && <p>Error Loading Equipment: {errorEquipments}</p>}
            {!loadingEquipments && Object.entries(equipments).map(([type, items]) => (
                <EquipmentSection
                  key={type}
                  type={type}
                  typeId={items[0].typeId}
                  equipments={items}
                  selectedEquipments={formData[type] || []}
                  onSelect={(idEquipment) => handleSelectEquipment(type, idEquipment)}
                />
            ))}
        </div>

        <div className={editStyle.carImgs}>
            <div className={editStyle.formGroup}>
                <label htmlFor="carImages">Images de la voiture</label>
                <input
                  type="file"
                  id="carImages"
                  name="carImages"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className={editStyle.carInput}
                />
            </div>
        </div>

        <div className={editStyle.previewContainer}>
    {formData.carImages.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt={`Preview ${index + 1}`}
        className={`${editStyle.previewImage} ${index === mainImageIndex ? editStyle.mainImage : ''}`}
        onClick={() => handleSetMainImage(index)}
      />
    ))}
  </div>

        <div className={editStyle.formActions}>
          <Button type="submit" className={editStyle.submitBtn} onSubmit={handleSubmit}>Enregistrer</Button>
          <Button type="button" className={editStyle.cancelBtn} onClick={onClose}>Annuler</Button>
        </div>


       


      </form>



      </div>
      
    </div>
  );
};

export default EditCarModal;