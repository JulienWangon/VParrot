import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessagesContext';
import ProtectedRoute from './_utils/ProtectedRoute';

// Publics Pages Components Import
import Home from "./pages/public/Home/Home";
import MaintenanceServices from "./pages/public/MaintenanceServices/MaintenanceServices";
import RepairServices from "./pages/public/RepairServices";
import SalesArea from "./pages/public/SalesArea";

//Import Error Component
import Error from './_utils/Error';

// Admin Pages Components Import
import AdminHome from "./pages/admin/AdminHome";
import CarsManager from './pages/admin/CarsManager';
import SchedulesManager from './pages/admin/SchedulesManager';
import ServicesManager from './pages/admin/ServicesManager';
import TestimoniesManager from './pages/admin/TestimoniesManager';
import UsersManager from './pages/admin/UsersManager';
import AdminLoginPage from './pages/admin/AdminLoginPage';


function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <MessageProvider>

                <AuthProvider>
                    <Routes>

                        <Route index element={<Home/>}/>

                        <Route path="/accueil" element={<Home/>}/>
                        <Route path="/entretiens" element={<MaintenanceServices/>}/>
                        <Route path="/reparations" element={<RepairServices/>}/>
                        <Route path="/ventes" element={<SalesArea/>}/>
                        <Route path="/access-panel" element={<AdminLoginPage/>}/>

                        <Route 
                          path="/accueiladmin" 
                          element={
                              <ProtectedRoute>
                                  <AdminHome/>
                              </ProtectedRoute>
                          }
                        />
                        <Route 
                          path="/utilisateurs" 
                          element={
                              <ProtectedRoute>
                                  <UsersManager/>
                              </ProtectedRoute>
                          }
                        />
                        <Route 
                          path="/avisclients" 
                          element={
                              <ProtectedRoute>
                                  <TestimoniesManager/>
                              </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/horaires"
                          element={
                              <ProtectedRoute>
                                  <SchedulesManager/>
                              </ProtectedRoute>
                          }     
                        />
                        <Route 
                          path="/services" 
                          element={
                              <ProtectedRoute>
                                  <ServicesManager/>
                              </ProtectedRoute>
                          }
                        />
                        <Route 
                          path="/parcauto" 
                          element={
                              <ProtectedRoute>
                                  <CarsManager/>
                              </ProtectedRoute>
                          }
                        />

                        <Route path="*" element={<Error/>}/>
                        
                    </Routes>
                </AuthProvider>
            </MessageProvider>       
        </BrowserRouter>

    </div>
  );
}

export default App;
