import React from "react";
import Button from "../../../common/Buttons/Button/Button";



const TreatedContactCard = ({ treatedContact }) => {
  return (
      <div className="card my-3">
          <h5 className="card-header">{treatedContact.contactSubject}</h5>
          <div className="card-body">
              <h5 className="card-title">{`${treatedContact.lastName} ${treatedContact.firstName}`}</h5>
              
                  <span className="card-text" >{treatedContact.email}</span>
                  <span className="card-text">{treatedContact.phone}</span>      
        
              <p className="card-text">{treatedContact.content}</p>

              
                <span>{treatedContact.treatmentDate}</span>
                <p>{treatedContact.userComment}</p>
            
                         
              <Button className="TreatedContactTraitment" colorStyle="redBtn">Traiter le Message</Button>   
          </div>
          <div className="card-footer text-muted">
              <span className="emailContact me-3">{`Traité par: ${treatedContact.userLastName} ${treatedContact.userfirstName}`}</span>
              <span className="phoneContact">{`Status: ${treatedContact.status}`}</span>      
          </div>
      </div>
  );
};

export default TreatedContactCard;