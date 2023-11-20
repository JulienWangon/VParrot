import React from 'react';
import Header from '../../../components/common/Header/Header';
import H2Title from '../../../components/common/H2Title/H2Title';
import SchedulesSection from '../../../components/Schedules/SchedulesSection/SchedulesSection';


import './schedulesManager.css';

const SchedulesManager = () => {

 

  return (
    <>
      <Header title="Horaires" slogan="Gestion des horaires d'ouverture"/>
      <main>
          <H2Title h2Text="Vos horaires d'ouverture" className="schedulesSectionTitle"/>
          <SchedulesSection/>



      </main>
    </>
  );
};

export default SchedulesManager;