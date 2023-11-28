import React from 'react';
import Header from '../../../components/common/Header/Header';
import ModerationSection from '../../../components/Testimonies/admin/ModerationSection/ModerationSection';
import H2Title from '../../../components/common/H2Title/H2Title';

import './testimoniesManager.css';

import ValidateTestimoniesSection from '../../../components/Testimonies/admin/ValidateTestimonies/ValidateTestimoniesSection';
import RejectedTestimoniesSection from '../../../components/Testimonies/admin/RejectedTestimonies/RejectedTestimonies';
import CreationSection from '../../../components/Testimonies/admin/CreationSection/CreationSection';

const TestimoniesManager = () => { 



  
  return (
    <>

        <Header title="Avis Clients" slogan="Gestion des avis clients"/>
        <main>

            <CreationSection/>

            <H2Title h2Text="Vos avis client en attente de modération" className="moderationSectionTitle"/>
            <ModerationSection/>

            <H2Title h2Text="Vos avis clients publiés" className="validateTestimoniesTitle"/>
            <ValidateTestimoniesSection/>

            <H2Title h2Text="Vos avis clients rejetés" className="rejectedTestimoniesTitle"/>
            <RejectedTestimoniesSection/>

        </main>     
    </>
  );
};

export default TestimoniesManager;