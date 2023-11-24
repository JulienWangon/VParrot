import React from 'react';
import Header from '../../../components/common/Header/Header';
import ModerationSection from '../../../components/Testimonies/admin/ModerationSection/ModerationSection';
import H2Title from '../../../components/common/H2Title/H2Title';

import './testimoniesManager.css';
import ValidateTestimoniesSection from '../../../components/Testimonies/admin/ValidateTestimonies/ValidateTestimoniesSection';
import RejectedTestimoniesSection from '../../../components/Testimonies/admin/RejectedTestimonies/RejectedTestimonies';

import useGetUnmoderatedTestimonies from '../../../components/Testimonies/hooks/useFetchUnmoderatedTestimonies';
import useFetchRejectedTestimonies from '../../../components/Testimonies/hooks/useFetchRejectedTestimonies';
import useFetchModeratedTestimonies from '../../../components/Testimonies/hooks/useFetchModeratedTestimonies';
import useFetchApproveTestimony from '../../../components/Testimonies/hooks/useFetchApproveTestimony';
import useFetchRejectTestimony from '../../../components/Testimonies/hooks/useFetchRejectTestimony';

const TestimoniesManager = () => { 

    const { testimonies: unmoderatedTestimonies } = useGetUnmoderatedTestimonies();
    const { testimonies: rejectedTestimonies } = useFetchRejectedTestimonies();
    const { testimonies: moderatedTestimonies } = useFetchModeratedTestimonies();

    const { approveThisTestimony } = useFetchApproveTestimony();
    const { rejectThisTestimony } = useFetchRejectTestimony();

  
  return (
    <>

        <Header title="Avis Clients" slogan="Gestion des avis clients"/>
        <main>

            <H2Title h2Text="Vos avis client en attente de modération" className="moderationSectionTitle"/>
            <ModerationSection
                testimonies={unmoderatedTestimonies}
                onApprove={approveThisTestimony}
                onReject={rejectThisTestimony}               
            />

            <H2Title h2Text="Vos avis clients publiés" className="validateTestimoniesTitle"/>
            <ValidateTestimoniesSection testimonies={moderatedTestimonies}/>

            <H2Title h2Text="Vos avis clients rejetés" className="rejectedTestimoniesTitle"/>
            <RejectedTestimoniesSection testimonies={rejectedTestimonies}/>

        </main>     
    </>
  );
};

export default TestimoniesManager;