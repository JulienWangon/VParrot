import React from 'react';

import './schedulesTab.css';

const SchedulesTab = ({ schedules, onOpenModal }) => {
  console.log(schedules)
  return (
    <>
      <table className="table text-center table-bordered table-hover table-striped table-responsive align-middle schedulesTable">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Matin: Ouverture</th>
              <th className="d-none d-md-table-cell">Matin: Fermeture</th>
              <th className="d-none d-md-table-cell">Après-midi: Ouverture</th>
              <th>Après-midi: Fermeture</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.idOpeningDay}>
                <td>{schedule.dayOfWeek}</td>
                <td>{schedule.morningOpening}</td>
                <td className="d-none d-md-table-cell">{schedule.morningClosing}</td>
                <td className="d-none d-md-table-cell">{schedule.afternoonOpening}</td>
                <td>{schedule.afternoonClosing}</td>
                <td>
                  <button className="btn btn-primary eyeBtn" onClick={() => onOpenModal(schedule)}>
                    <i className="fas fa-eye eyeBtnLogo"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    
      
    </>
  );
};

export default SchedulesTab;