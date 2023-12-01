import React from 'react';
import Button from '../../common/Buttons/Button/Button';

import cardStyle from './userCard.module.css';

const UserCard = ({ user, onOpenModal }) => {
  return (
    <div className={`${cardStyle.cardUser} card my-3`}>
            <h5 className={`${cardStyle.cardUserHeader} card-header`}>{user.roleName}</h5>
            <div className={`${cardStyle.cardUserBody} card-body`}>
                <h5 className={`${cardStyle.cardUserTitle} card-title`}>{`${user.lastName} ${user.firstName}`}</h5>
                <p className={`${cardStyle.cardUserContent} card-text`}>{user.userEmail}</p>
                   
            </div>
            <div className={`${cardStyle.cardContactFooter} card-footer`}>
                <Button className={cardStyle.updateUser} colorStyle="redBtn">Modifier</Button>
                <Button className={cardStyle.deleteUser} colorStyle="redBtn">Supprimer</Button>         
            </div>
        </div>
  );
};

export default UserCard;