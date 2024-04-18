import React, { createContext, useContext } from 'react';

import  useServicesGroupedByType from '../components/Services/hooks/useServicesGroupedByType';
import useFetchAllServiceTypes from '../components/Services/hooks/useFetchAllServiceTypes';
import useCreateService from '../components/Services/hooks/useCreateService';
import useUpdateService from '../components/Services/hooks/useUpdateService';
import useDeleteService from '../components/Services/hooks/useDeleteService';


const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const { servicesGroupedByType, loading, error,  fetchService } = useServicesGroupedByType();
  const { type: serviceTypes, loading: loadingTypes, error: errorTypes } = useFetchAllServiceTypes();
  const { createService, loading: loadingCreateService } = useCreateService();
  const { updateServiceData, loading: loadingUpdateService } = useUpdateService();
  const { deleteServiceData, loading: loadingDeleteService } = useDeleteService();

 

  return (
    <ServiceContext.Provider value={{ servicesGroupedByType, serviceTypes, loading, loadingTypes, errorTypes, error, createService, loadingCreateService,  fetchService, updateServiceData, loadingUpdateService, deleteServiceData, loadingDeleteService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);