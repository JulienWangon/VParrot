import React from 'react';
import Button from '../../../common/Buttons/Button/Button';

const ContactCard = ( { contact }) => {
    return (
        <div className="cardContact">
            <h5 className="cardcontactHeader">{contact.contactSubject}</h5>
            <div className="cardContactBody">
                <h5 className="cardContactTitle">{`${contact.lastName} ${contact.firstName}`}</h5>
                <p className="cardContactContent">{contact.content}</p>
                <Button>Traiter le Message</Button>   
            </div>
            <div class="cardContactFooter">
                <span className="emailContact">{contact.email}</span>
                <span className="phoneContact">{contact.phone}</span>      
            </div>
        </div>
    );
};

export default ContactCard;

