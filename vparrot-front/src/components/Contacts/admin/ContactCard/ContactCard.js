import React from 'react';
import Button from '../../../common/Buttons/Button/Button';

const ContactCard = ( { contact }) => {
    return (
        <div className="cardContact card my-3">
            <h5 className="cardcontactHeader card-header">{contact.contactSubject}</h5>
            <div className="cardContactBody card-body">
                <h5 className="cardContactTitle card-title">{`${contact.lastName} ${contact.firstName}`}</h5>
                <p className="cardContactContent card-text">{contact.content}</p>
                <Button className="contactTraitment" colorStyle="redBtn">Traiter le Message</Button>   
            </div>
            <div className="cardContactFooter card-footer text-muted">
                <span className="emailContact me-3">{contact.email}</span>
                <span className="phoneContact">0{contact.phone}</span>      
            </div>
        </div>
    );
};

export default ContactCard;

