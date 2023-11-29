import React from "react";

import './tabCardTestimony.css';

const TabCardTestimony = ({ testimonies, onOpenModal }) => {
   
  return (
    <>

      <div className="d-block testyBlock">
        <div className="row testyRow">
          {testimonies.map(testimony => (
            <div key={testimony.idTestimony} className="col-12 col-md-6 col-xxl-4 testyCard">
              <div className="card moderationCard">
                <div className="card-body">
                  <h5 className="card-title">{testimony.firstName} {testimony.lastName}</h5>
                  <p className="card-text">{testimony.content}</p>
                  <button 
                    className="btn testimonyDetails" 
                    onClick={() => onOpenModal(testimony)}
                  >
                    <i className="fas fa-eye"></i> Voir Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabCardTestimony;