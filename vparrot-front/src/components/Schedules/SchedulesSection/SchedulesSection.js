import React, { useState, useEffect } from 'react';
import  useFetchAllSchedules from '../hooks/useFetchAllSchedules';
import SchedulesTab from '../SchedulesTab/SchedulesTab';
import SchedulesModal from '../SchedulesModal/SchedulesModal';

import './schedulesSection.css';


const SchedulesSection = () => { 
    //Mise a jour initial des horaires 
    const { schedules: initialSchedules, loading } = useFetchAllSchedules();
    //Etat local de suivi des horaires 
    const [schedules, setSchedules] = useState(initialSchedules);
    //Etat local pour suivre le jour selectionné pour modification dans la modale
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    //Mise a jour de l'état local lorsque les odnnées initiale chargents
    useEffect(() => {
        setSchedules(initialSchedules);
    }, [initialSchedules]);

    //Ouverture de la modal + définit le jour sélectionné
    const handleOpenModal = (schedule) => {
     
      setSelectedSchedule(schedule);
      setIsModalOpen(true);
    };

    //Fermeture de la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    //Mise à jour des horaires après modification
    const updateScheduleInList = (updatedSchedule) => {
        const newSchedules = schedules.map(schedule => {
    //Remplacement du jour modifié par la nouvelle version
            if (schedule.idOpeningDay === updatedSchedule.idOpeningDay) {
                return updatedSchedule;
            }
            return schedule;
        });
    //Mise à jour de l'état avec la nouvelle liste à jour
        setSchedules(newSchedules);
    };

    //Si chargement long affichage de la div loading
    if (loading) {
        return <div>Loading...</div>
    }

    return (
    
        <section className="schedulesSection">

            <SchedulesTab schedules={schedules} onOpenModal={handleOpenModal}/>

            {isModalOpen && selectedSchedule && (
                <SchedulesModal 
                    schedule={selectedSchedule} 
                    onClose={handleCloseModal} 
                    onSave={updateScheduleInList}   
                />
            )}       
        </section>
    );
};

export default SchedulesSection;