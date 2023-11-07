import React from 'react';
import useFetchSchedules from './hooks/useFetchSchedules';

import H3Title from '../common/H3Title/H3Title';

import './footer.css';

const Footer = () => {

  const { schedules, loading, error } = useFetchSchedules();

  return (
    <footer>
        <div className="schedulsContainer">
            <H3Title className="schedulesTitle" h3Text="horaires d'ouverture"/>
            {loading ? (
                <p>Chargement des horaires...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {schedules.map((schedule) => (
                        <li key={schedules.id_opening_day}>
                            <strong>{schedule.day_of_week.substring(0, 3)}:</strong> {schedule.morning_opening.substring(0. 5)} - {schedule.morning_closing.substring(0,5)} / {schedule.afternoon_opening.substring(0, 5)} - {schedule.afternoon_closing.substring(0, 5)} 
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className="adressContainer">
            <H3Title className="adressTitle" h3Text="Garage v.Parrot"/>
            <p className="adress">12 rue des dépravés 31000 Toulouse</p>
            <p className="phone">04.28.64.32.86</p>          
        </div>
        <div className="contactContainer">
          


        </div>      
    </footer>
  );
};

export default Footer;