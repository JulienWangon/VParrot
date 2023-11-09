import React from 'react';

import ServiceCard from '../ServiceCard/ServiceCard';
import H2Title from '../../../common/H2Title/H2Title';


const SectionService = ({ title, introduction, services, className, h2Text }) => {

    return (
        <section>
            <H2Title className="className" h2Text={title}/>
            <p className="serviceIntroduction">{introduction}</p>
            <div className="serviceGrid">
                {services.map(service => (
                    <ServiceCard
                        key={service.id_service}
                        name={service.service_name}
                        description={service.description}
                        price={service.price}
                        pathImg={service.path_img}
                    />
                ))}
            </div>          
        </section>
    );
};

export default SectionService;