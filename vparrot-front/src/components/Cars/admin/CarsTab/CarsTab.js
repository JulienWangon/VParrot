import React from 'react';
import Swal from 'sweetalert2';

import { useCars } from '../../../../contexts/CarContext';
import { useAuth } from '../../../../contexts/AuthContext';


import H2Title from '../../../common/H2Title/H2Title';
import './carsTable.css';

const CarsTab = () => {
  const { carAdminDetails, loadingCarAdmin, errorCarAdmin, deleteCarData, loadingDeleteCar, refreshCarData } = useCars();
  const { csrfToken } = useAuth();

  const handleDeleteCar = async (carId) => {

    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-la!'
    });

    if (result.isConfirmed) {
      const response = await deleteCarData(carId, csrfToken);
      refreshCarData();

      if (response.success) {
        Swal.fire(
          'Supprimé!',
          'Le véhicule a été supprimé.',
          'success'
        );
      }
    }
  };

  // Affichage conditionnel en fonction de l'état de chargement ou d'erreur
  if (loadingCarAdmin || loadingDeleteCar) return <p>Chargement...</p>;
  if (errorCarAdmin) return <p>Erreur: {errorCarAdmin}</p>;

  return (
    <div className="carAdminTableSection">
      <H2Title h2Text="Gestion des véhicules" className="carAdminSectionTitle"/>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle text-center">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Marque</th>
              <th className="d-none d-md-table-cell">Modèle</th>
              <th className="d-none d-md-table-cell">Dénomination Commerciale</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carAdminDetails.map(car => (
              <tr key={car.idCar}>
                <td>{car.idCar}</td>
                <td><img src={car.carImage} alt={`${car.brandName} ${car.modelName}`} style={{ width: '100px', height: '100px', objectFit: 'cover'}} /></td>
                <td>{car.brandName}</td>
                <td className="d-none d-md-table-cell">{car.modelName}</td>
                <td className="d-none d-md-table-cell">{car.tradeName}</td>
                <td>{car.carPrice} €</td>
                <td>
                  <button className="btn btn-primary mx-1 mb-2">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="btn btn-danger mx-1">
                    <i className="fas fa-trash" onClick={() => handleDeleteCar(car.idCar)}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarsTab;
