import React from 'react';

import './equipmentsList.css'

const EquipmentsList = ({ data, labelFunction }) => {
  return (
    <div className="accordionSection">

        {Object.keys(data).map((key, index) => (
            <div className="accordion" id={`accordion-${index}`} key={key}>
                <div className="accordionItem">
                    <h2 className="accordionHeader accordionTitle ">
                        <button
                              className={`accordion-button customHeader ${
                              data[key].length > 0 ? 'active' : ''
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${index}`}
                              aria-expanded="true"
                        >
                            {labelFunction(key)} {/* Afficher le label généré ici */}
                        </button>
                  </h2>
                  <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse"
                  >
                      <div className="accordion-body">
                          <ul>
                              {data[key].map((item, subIndex) => (
                                <li className="itemEquipment" key={subIndex}>{item}</li>
                              ))}
                          </ul>
                      </div>
                  </div>
                </div>
            </div>
        ))}
      
    </div>
  );
};

export default EquipmentsList;