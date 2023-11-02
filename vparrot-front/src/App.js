import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './_utils/ProtectedRoute';

// Publics Pages Components Import
import Home from "./pages/public/Home";
import MainteanceServices from "./pages/public/MainteanceServices";
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


function App() {
  return (
    <div className="App">

        <BrowserRouter>

            <AuthProvider>
                <Routes>

                    <Route index element={<Home/>}/>

                    <Route path="/home" element={<Home/>}/>
                    <Route path="/entretiens" element={<MainteanceServices/>}/>
                    <Route path="/reparations" element={<RepairServices/>}/>
                    <Route path="/ventes" element={<SalesArea/>}/>

                    <Route 
                      path="/adminhome" 
                      element={
                          <ProtectedRoute>
                              <AdminHome/>
                          </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/manageusers" 
                      element={
                          <ProtectedRoute>
                              <UsersManager/>
                          </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/managetestimonies" 
                      element={
                          <ProtectedRoute>
                              <TestimoniesManager/>
                          </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/manageschedules"
                      element={
                          <ProtectedRoute>
                              <SchedulesManager/>
                          </ProtectedRoute>
                      }     
                    />
                    <Route 
                      path="/manageservices" 
                      element={
                          <ProtectedRoute>
                              <ServicesManager/>
                          </ProtectedRoute>
                      }
                    />
                    <Route 
                      path="/managecars" 
                      element={
                          <ProtectedRoute>
                              <CarsManager/>
                          </ProtectedRoute>
                      }
                    />

                    <Route path="*" element={<Error/>}/>
                    
                </Routes>
            </AuthProvider>       
        </BrowserRouter>

    </div>
  );
}

export default App;
