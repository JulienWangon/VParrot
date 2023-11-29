import React from 'react';

import { useTestimonies } from '../../../../contexts/TestimoniesContext';

import './testimonyTable.css';

const TestimonyTable = ({ testimonies, onOpenModal }) => {

  const { deleteTestimony } = useTestimonies();

  const handleDelete = (idTestimony) => {
    // Confirmer avant la suppression
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
        deleteTestimony(idTestimony);
    }
};


  return (
    <>
      <table className="table table-bordered table-hover table-striped table-responsive align-middle testyTable">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Note</th>
      <th className="d-none d-md-table-cell">Commentaire</th>
      <th className="d-table-cell d-md-none">Détails</th>
      <th className="d-none d-md-table-cell">Supprimer</th>
    </tr>
  </thead>
  <tbody>
    {testimonies.map((testimony) => (
      <tr key={testimony.idTestimony}>
        <td>{testimony.lastName}</td>
        <td>{testimony.firstName}</td>
        <td>{testimony.rating}</td>
        <td className="d-none d-md-table-cell">{testimony.content}</td>
        <td className="d-table-cell d-md-none">
          <button className="btn btn-primary eyeBtn" onClick={() => onOpenModal(testimony)}>
            <i className="fas fa-eye eyeBtnLogo"></i>
          </button>
        </td>
        <td className="d-none d-md-table-cell">
        <button className="btn btn-danger" onClick={() => handleDelete(testimony.idTestimony)}>
          <i className="fas fa-trash-alt"></i> {/* Icône de suppression */}
        </button>
      </td>

        
        
      </tr>
    ))}
  </tbody>
</table>
    </>
  );
};

export default TestimonyTable;
