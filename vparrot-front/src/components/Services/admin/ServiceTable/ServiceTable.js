import React from 'react';
import Swal from 'sweetalert2';

import { useServices } from '../../../../contexts/ServicesContext';
import { useAuth } from '../../../../contexts/AuthContext';

import './servicesTable.css';

import H2Title from '../../../common/H2Title/H2Title';


const ServicesTable = ({ title, services, onOpenModal }) => {

  const { deleteServiceData, fetchService } = useServices();
  const { csrfToken } = useAuth();

  const handleDelete = async (serviceId) => {
    
  
      const result = await Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      });
  
      if (result.isConfirmed) {       
          await deleteServiceData(serviceId, csrfToken);
          fetchService();   
      }
   
  };

  return (
    <div className="serviceTabSection">
      <H2Title h2Text={title} className="serviceSectionTitle"/>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="thead-dark">
            <tr>
              <th>Nom</th>
              <th className="d-none d-md-table-cell">Description</th>
              <th>Prix</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.idService}>
                <td>{service.serviceName}</td>
                <td className="d-none d-md-table-cell">{service.description}</td>
                <td>{service.price}{!isNaN(parseFloat(service.price)) && " €"}</td>
                <td>
                  <img src={service.pathImg} alt={service.serviceName} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </td>
                <td>
                  <div className="d-none d-md-block text-center">
                   
                    <button className="btn btn-primary mx-1 mb-2" onClick={() => onOpenModal(service)}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                 
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(service.idService)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center d-md-none" style={{ height: '100%' }}>
                 
                    <button className="btn btn-primary eyeBtnContainer" onClick={() => onOpenModal(service)}>
                      <i className="fas fa-eye eyeBtn"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;



