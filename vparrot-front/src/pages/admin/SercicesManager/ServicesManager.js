import React, { useState } from 'react';
import Header from '../../../components/common/Header/Header';
import ServicesTable from '../../../components/Services/admin/ServiceTable/ServiceTable';
import { useServices } from '../../../contexts/ServicesContext';
import Button from '../../../components/common/Buttons/Button/Button';
import ServiceModal from '../../../components/Services/admin/ServiceModal/ServiceModal';
import './serviceManager.css';

const ServicesManager = () => {
  const { servicesGroupedByType, loading, error } = useServices(); 

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');  // 'create' or 'update'
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const openModal = (service = null) => {
    if (service) {
      setServiceToEdit(service);
      setModalMode('update');
    } else {
      setModalMode('create');
      setServiceToEdit(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement: {error}</p>;
  return (
    <>
      <Header title="Services" slogan="Gestion de vos services"/>
      <div className="newServiceContainer">
        <Button colorStyle="redBtn" onClick={() => openModal()}>Nouveau service</Button>
      </div> 
      <ServicesTable title="Vos services d'entretien" services={servicesGroupedByType.entretien} onOpenModal={openModal}/>
      <ServicesTable title="Vos services de carrosserie" services={servicesGroupedByType.carrosserie} onOpenModal={openModal}/>
      <ServicesTable title="Vos services de réparation" services={servicesGroupedByType.reparation} onOpenModal={openModal}/>

      {showModal && <ServiceModal closeModal={closeModal} serviceToUpdate={serviceToEdit} mode={modalMode} />}
    </>
  );
};

export default ServicesManager;
