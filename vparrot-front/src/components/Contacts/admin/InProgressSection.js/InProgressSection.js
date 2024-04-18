import React from "react";

import useFetchAllTreatedContacts from "../../hooks/useFetchAllTreatedContact";
import TreatedContactCard from "../TreatedContactCard/TreatedContactCard";
import H2Title from "../../../common/H2Title/H2Title";


const InProgressSection = () => {

    const { treatedContacts, isLoading } = useFetchAllTreatedContacts();

    if(isLoading) return <p>Chargement des contacts</p>

    return (
        <section>
            <H2Title h2Text="Contacts en cours de traitement" className=""/>
            <div>
                {treatedContacts.enCours.map(contact => (
                    <div className="ContactCardContainer" key={contact.idTreatedContact}>
                    <TreatedContactCard treatedContact={contact}/>
                    </div>
                ))}
            </div>          
        </section>
    );
};

export default InProgressSection;