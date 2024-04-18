import React from 'react';
import useFetchAllTreatedContacts from '../../hooks/useFetchAllTreatedContact';
import TreatedContactCard from '../TreatedContactCard/TreatedContactCard';
import H2Title from '../../../common/H2Title/H2Title';


const TreatedContactSection = () => {

    const { treatedContacts, isLoading } = useFetchAllTreatedContacts();

    if(isLoading) return <p>Chargement des contacts</p>
    
    return (
        <section>  
            <H2Title h2Text="Contacts traités" className=""/>
            <div>
                {treatedContacts.traite.map(contact => (
                    <div className="contactCardContainer" key={contact.idTreatedContact}>
                    <TreatedContactCard treatedContact={contact}/>
                    </div>
                ))}           
            </div>             
        </section>
    );
};

export default TreatedContactSection;