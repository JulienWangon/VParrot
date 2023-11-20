import React from 'react';
import Button from '../../Buttons/Button/Button';

import './unauthorizedModal.css';

const UnauthorizedModal = ({ title, children, onClose}) => {
  return (
    <div className="modalOverlay">
        <div className="unauthorizedModal">
            <div className="unauthorizedModalHeader">
                <h5 className="unauthorizedModalTitle">{title}</h5>              
            </div>
            <div className="unauthorizedModalBody">
                {children}
            </div>
              <div className="unauthorizedModalFooter">
                  <Button className="unauthorizedModalBtn" colorStyle="redBtn" onClick={onClose}>Fermer</Button>
              </div>
          </div>  
    </div>
  );
};

export default UnauthorizedModal;