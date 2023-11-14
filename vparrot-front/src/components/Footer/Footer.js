import React from 'react';
import useFetchSchedules from './hooks/useFetchSchedules';

import H3Title from '../common/H3Title/H3Title';

import './footer.css';
import ContactBtn from '../common/Buttons/ContactBtn/ContactBtn';

const Footer = () => {

  const { schedules, loading, error } = useFetchSchedules();

  return (
    <footer>
        <div className="opacityFooter"></div>
        <div className="adressContainer">
            <H3Title className="adressTitle" h3Text="Garage v.Parrot"/>
            <p className="adress">12 rue des dépravés 31000 Toulouse</p>
            <p className="phone">04.28.64.32.86</p>          
        </div>
        <div className="schedulesContainer">
            <H3Title className="schedulesTitle" h3Text="Horaires d'ouverture"/>
            {loading ? (
                <p>Chargement des horaires...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {schedules.map((schedule) => (
                        <li key={schedule.idOpeningDay}>
                            <strong>{schedule.dayOfWeek.substring(0, 3)}:</strong> {schedule.morningOpening.substring(0, 5)} - {schedule.morningClosing.substring(0,5)} / {schedule.afternoonOpening.substring(0, 5)} - {schedule.afternoonClosing.substring(0, 5)} 
                        </li>
                    ))}
                </ul>
            )}
        </div>
        
        <div className="footerBtn">
            <ContactBtn/>
        </div>      
    </footer>
  );
};

export default Footer;