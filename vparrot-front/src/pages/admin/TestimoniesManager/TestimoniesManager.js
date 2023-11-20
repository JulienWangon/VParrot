import React, { useState } from 'react';
import Header from '../../../components/common/Header/Header';
import ModerationSection from '../../../components/Testimonies/admin/ModerationSection/ModerationSection';
import H2Title from '../../../components/common/H2Title/H2Title';

import './testimoniesManager.css';
import ValidateTestimoniesSection from '../../../components/Testimonies/admin/ValidateTestimonies/ValidateTestimoniesSection';
import RejectedTestimoniesSection from '../../../components/Testimonies/admin/RejectedTestimonies/RejectedTestimonies';


const TestimoniesManager = () => { 

    const [refreshKey, setRefreshKey] = useState(0);

    const handleTestimonyApproval = () => {

        setRefreshKey(oldKey => oldKey + 1);
    }


  return (
    <>

        <Header title="Avis Clients" slogan="Gestion des avis clients"/>
        <main>

            <H2Title h2Text="Vos avis client en attente de modération" className="moderationSectionTitle"/>
            <ModerationSection onTestimonyApproved={handleTestimonyApproval}/>

            <H2Title h2Text="Vos avis clients publiés" className="validateTestimoniesTitle"/>
            <ValidateTestimoniesSection key={refreshKey}/>

            <H2Title h2Text="Vos avis clients rejetés" className="rejectedTestimoniesTitle"/>
            <RejectedTestimoniesSection key={refreshKey}/>

        </main>     
    </>
  );
};

export default TestimoniesManager;