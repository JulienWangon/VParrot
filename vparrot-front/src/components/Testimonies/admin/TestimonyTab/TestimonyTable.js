import React from 'react';

import './testimonyTable.css';

const TestimonyTable = ({ testimonies, onOpenModal }) => {


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
      </tr>
    ))}
  </tbody>
</table>
    </>
  );
};

export default TestimonyTable;
