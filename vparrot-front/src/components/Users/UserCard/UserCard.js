import React from 'react';

import Button from '../../common/Buttons/Button/Button';

const UserCard = (users, onOpenModal) => {
  return (
    <div className="cardContact card my-3">
            <h5 className="cardcontactHeader card-header">{users.role}</h5>
            <div className="cardContactBody card-body">
                <h5 className="cardContactTitle card-title">{`${users.lastName} ${users.firstName}`}</h5>
                <p className="cardContactContent card-text">{users.email}</p>
                   
            </div>
            <div class="cardContactFooter card-footer text-muted">
                <Button className="contactTraitment" colorStyle="redBtn">Modifier</Button>
                <Button className="contactTraitment" colorStyle="redBtn">Supprimer</Button>         
            </div>
        </div>
  );
};

export default UserCard;