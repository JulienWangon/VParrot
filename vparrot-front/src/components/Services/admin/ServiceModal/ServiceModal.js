import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import serviceStyle from './serviceModal.module.css';

import { useServices } from '../../../../contexts/ServicesContext';
import { useAuth } from '../../../../contexts/AuthContext';

import H2Title from '../../../common/H2Title/H2Title';
import TextInput from '../../../common/Input/TextInput/TextInput';
import SelectInput from '../../../common/Input/SelectInput/SelectInput';
import TextArea from '../../../common/Input/TextArea/TextArea';
import Button from '../../../common/Buttons/Button/Button';

const ServiceModal = ({ closeModal, serviceToUpdate, mode }) => {

  const { serviceTypes, createService, fetchService, updateServiceData, deleteServiceData } = useServices();

  const { csrfToken } = useAuth();

  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    servicePhoto: null,
    serviceTypeId: '', 
    serviceTypeName: ''
  });

  useEffect(() => {
    if (mode === 'update' && serviceToUpdate) {
      setFormData({
        serviceName: serviceToUpdate.serviceName,
        serviceDescription: serviceToUpdate.description, 
        servicePrice: serviceToUpdate.price, // Modification ici
        serviceTypeId: serviceToUpdate.idType, 
        serviceTypeName: serviceToUpdate.typeName, 
        servicePhoto: null
      });
    }
  }, [mode, serviceToUpdate]);



   // Préparation des options pour le SelectInput
   const serviceTypeOptions = [
    { id: 'default', value: '', label: 'Choisir un type de service' },
    ...(serviceTypes ? serviceTypes.map(type => ({
      id: type.idType,
      value: `${type.idType}-${type.typeName}`,
      label: type.typeName
    })) : [])
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'serviceType') {   
      const [id, typeName] = value.split('-');  
      setFormData(prevFormData => ({
        ...prevFormData,
        serviceTypeId: id, 
        serviceTypeName: typeName 
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }

  };

  // Gestion du changement dans le champ de fichier de la photo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevFormData => ({
      ...prevFormData,
      servicePhoto: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] != null) {
        formToSend.append(key, formData[key]);
      }
    });

    try {
      if (mode === 'create') {
        await createService(formToSend, csrfToken);
      } else {
        await updateServiceData(serviceToUpdate.idService, formToSend, csrfToken);
      }
      await fetchService();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du service:', error);
    }
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    if (mode === 'update' && serviceToUpdate) {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!',
        zIndex: '4000'
      });
  
      if (result.isConfirmed) {
        await deleteServiceData(serviceToUpdate.idService, csrfToken);
        await fetchService(); 
        closeModal(); 
      }
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={serviceStyle.modalOverlay } onClick={handleOutsideClick}>
       <div className={serviceStyle.formContainer}>
       <H2Title h2Text={mode === 'create' ? "Ajouter un service" : "Modifier le service"} className={serviceStyle.userModalTitle} colorStyle="whiteTitle"/>
        <form className={serviceStyle.createUser} onSubmit={handleSubmit}>
          {serviceTypes && 
            <SelectInput
              formGroupClass={serviceStyle.formGroup}
              label="Type de Service"
              name="serviceType"
              options={serviceTypeOptions}
              onChange={handleChange}
              value={`${formData.serviceTypeId}-${formData.serviceTypeName}`}  
            />
          }

          <TextInput
            formGroupClass={serviceStyle.formGroup}
            inputClassName={serviceStyle.serviceInput}
            label="Nom du service"
            placeholder="Entrer le nom du service"
            name="serviceName"
            type="text"
            value={formData.serviceName}
            onChange={handleChange}  
          />

          <TextArea
            formGroupClass={serviceStyle.formGroup}
            inputClassName={serviceStyle.serviceInput}
            label="Description"
            placeholder="Entrer la description"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
          />

          <TextInput
            formGroupClass={serviceStyle.formGroup}
            inputClassName={serviceStyle.serviceInput}
            label="Prix du service"
            placeholder="Entrer le prix"
            name="servicePrice"
            type="text"
            value={formData.servicePrice}
            onChange={handleChange}    
          />
          <div className={serviceStyle.formGroup}>
            <input type="file" name="servicePhoto" onChange={handleFileChange}/>
          </div>
          <div className={serviceStyle.btnContainer}>
            <Button className={serviceStyle.submitBtn} type="submit" colorStyle="whiteBtn" onClick={handleSubmit}>Enregistrer</Button>
            <Button className={serviceStyle.cancelBtn} type="button" colorStyle="whiteBtn" onClick={mode === 'update' ? handleDelete : closeModal}>
              {mode === 'update' ? 'Supprimer' : 'Annuler'}
            </Button>
          </div>
        </form>

       </div>
      
    </div>
  );
};

export default ServiceModal;