import React from 'react';

import ServiceCard from '../ServiceCard/ServiceCard';
import H2Title from '../../../common/H2Title/H2Title';

import './sectionService.css';

const SectionService = ({ title, introduction, services, className, h2Text }) => {

    return (
        <section>
            <H2Title className="sectionTitle" h2Text={title}/>
            <p className="serviceIntroduction">{introduction}</p>
            <div className="serviceGrid">
                {services.map(service => (
                    <ServiceCard
                        key={service.idService}
                        name={service.serviceName}
                        description={service.description}
                        price={service.price}
                        pathImg={service.pathImg}
                    />
                ))}
            </div>          
        </section>
    );
};

export default SectionService;